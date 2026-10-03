"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Link2, Pause, Play, Send, X } from "lucide-react";
import { stories, type Sticker, type StoryFrame, type StoryGroup } from "@/data/instagram";
import { StoryCover, Verified } from "./bits";
import { usePersistentSet, useSeenStories } from "./store";

const DURATION = 6000;

const rise = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1 + i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
});

function Frame({ frame, paused }: { frame: StoryFrame; paused: boolean }) {
    if (frame.kind === "image") {
        const contain = frame.fit === "contain";
        return (
            <div className="absolute inset-0 overflow-hidden bg-black">
                {contain && <Image src={frame.src} alt="" fill sizes="420px" className="scale-125 object-cover opacity-50 blur-2xl" />}
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.02 }}
                    animate={{ scale: paused ? undefined : 1.12 }}
                    transition={{ duration: DURATION / 1000 + 1, ease: "linear" }}
                >
                    <Image src={frame.src} alt="" fill sizes="420px" className={contain ? "object-contain" : "object-cover"} priority />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />
                {(frame.title || frame.caption) && (
                    <div className={`absolute inset-x-5 text-white ${frame.sticker?.type === "link" ? "bottom-[150px]" : "bottom-24"}`}>
                        {frame.title && (
                            <motion.h3 {...rise(0)} className="text-[26px] leading-tight font-extrabold drop-shadow-lg">
                                {frame.title}
                            </motion.h3>
                        )}
                        {frame.caption && (
                            <motion.p {...rise(1)} className="mt-2 inline rounded-md bg-black/55 box-decoration-clone px-2 py-0.5 text-[15px] leading-[1.7] font-medium">
                                {frame.caption}
                            </motion.p>
                        )}
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden px-8 text-white" style={{ background: frame.bg }}>
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            {frame.kind === "text" && (
                <>
                    {frame.eyebrow && <motion.div {...rise(0)} className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">{frame.eyebrow}</motion.div>}
                    <motion.h3 {...rise(1)} className="text-[32px] leading-tight font-extrabold">{frame.title}</motion.h3>
                    {frame.body && <motion.p {...rise(2)} className="mt-4 text-base leading-relaxed text-white/85">{frame.body}</motion.p>}
                </>
            )}
            {frame.kind === "stat" && (
                <>
                    <motion.div {...rise(0)} className="text-[84px] leading-none font-black tracking-tight">{frame.value}</motion.div>
                    <motion.div {...rise(1)} className="mt-2 text-xl font-semibold">{frame.label}</motion.div>
                    {frame.body && <motion.p {...rise(2)} className="mt-4 text-base text-white/80">{frame.body}</motion.p>}
                </>
            )}
            {frame.kind === "list" && (
                <>
                    <motion.h3 {...rise(0)} className="mb-6 text-2xl font-extrabold">{frame.title}</motion.h3>
                    <ul className="space-y-3">
                        {frame.items.map((it, i) => (
                            <motion.li key={it} {...rise(i + 1)} className="flex items-center gap-3 rounded-xl bg-white/12 px-4 py-3 text-[15px] font-medium backdrop-blur">
                                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-black">{i + 1}</span>
                                {it}
                            </motion.li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

/** Interactive stickers. Answers are stored locally; nothing pretends to be other people's votes */
function StickerView({ sticker, id, onClose, onInteract }: { sticker: Sticker; id: string; onClose: () => void; onInteract: (busy: boolean) => void }) {
    const answers = usePersistentSet("ig-story-answers");
    const prefix = `${id}=`;
    const answered = answers.items.find((a) => a.startsWith(prefix))?.slice(prefix.length);
    const answer = (v: string) => !answered && answers.add(prefix + v);
    const [slider, setSlider] = useState(answered ? Number(answered) : 50);
    const stop = { onPointerDown: (e: React.PointerEvent) => e.stopPropagation(), onPointerUp: (e: React.PointerEvent) => e.stopPropagation() };

    const card = "w-[78%] max-w-[300px] rounded-2xl bg-white p-4 text-black shadow-2xl";

    if (sticker.type === "link") {
        const external = sticker.href.startsWith("http") || sticker.href.endsWith(".pdf");
        const cls = "inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#0095f6] shadow-xl transition-transform active:scale-95";
        return (
            <motion.div {...rise(2)} {...stop}>
                {external ? (
                    <a href={sticker.href} target="_blank" rel="noopener noreferrer" download={sticker.href.endsWith(".pdf") || undefined} className={cls}>
                        <Link2 size={16} className="-rotate-45" /> {sticker.label.toUpperCase()}
                    </a>
                ) : (
                    <Link href={sticker.href} onClick={onClose} className={cls}>
                        <Link2 size={16} className="-rotate-45" /> {sticker.label.toUpperCase()}
                    </Link>
                )}
            </motion.div>
        );
    }

    if (sticker.type === "poll") {
        return (
            <motion.div {...rise(2)} {...stop} className={card}>
                <p className="mb-3 text-center text-base font-bold">{sticker.question}</p>
                <div className="space-y-2">
                    {sticker.options.map((o) => (
                        <button key={o} onClick={() => answer(o)} disabled={!!answered} className={`w-full rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-colors ${answered === o ? "border-transparent bg-gradient-to-r from-[#d62976] to-[#962fbf] text-white" : "border-black/10 hover:bg-black/5"}`}>
                            {o} {answered === o && "✓"}
                        </button>
                    ))}
                </div>
                {answered && <p className="mt-2 text-center text-xs text-black/50">Thanks for voting!</p>}
            </motion.div>
        );
    }

    if (sticker.type === "quiz") {
        return (
            <motion.div {...rise(2)} {...stop} className={card}>
                <p className="mb-3 text-center text-base font-bold">{sticker.question}</p>
                <div className="space-y-2">
                    {sticker.options.map((o, i) => {
                        const picked = answered === String(i);
                        const correct = i === sticker.answer;
                        const state = !answered ? "border-black/10 hover:bg-black/5" : correct ? "border-transparent bg-[#1cd14f] text-white" : picked ? "border-transparent bg-[#ff3040] text-white" : "border-black/10 opacity-50";
                        return (
                            <motion.button key={o} animate={answered && picked && !correct ? { x: [0, -8, 8, -4, 0] } : {}} onClick={() => answer(String(i))} disabled={!!answered} className={`flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-bold ${state}`}>
                                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current text-[10px]">{String.fromCharCode(65 + i)}</span>
                                {o}
                            </motion.button>
                        );
                    })}
                </div>
                {answered && <p className="mt-2 text-center text-xs text-black/50">{answered === String(sticker.answer) ? "Correct! Physics degree paying off 🎓" : "Not quite. It's centripetal force."}</p>}
            </motion.div>
        );
    }

    return (
        <motion.div {...rise(2)} {...stop} className={card}>
            <p className="mb-4 text-center text-base font-bold">{sticker.question}</p>
            <div className="relative h-10">
                <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-black/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#fa7e1e] to-[#d62976]" style={{ width: `${slider}%` }} />
                </div>
                <span className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl transition-transform" style={{ left: `${slider}%`, transform: `translate(-50%,-50%) scale(${0.8 + slider / 200})` }}>
                    {sticker.emoji}
                </span>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={slider}
                    disabled={!!answered}
                    onChange={(e) => setSlider(Number(e.target.value))}
                    onPointerDown={() => onInteract(true)}
                    onPointerUp={() => {
                        onInteract(false);
                        answer(String(slider));
                    }}
                    aria-label={sticker.question}
                    className="absolute inset-0 w-full cursor-pointer opacity-0"
                />
            </div>
            {answered && <p className="mt-1 text-center text-xs text-black/50">Sent {sticker.emoji}</p>}
        </motion.div>
    );
}

function SidePreview({ group, onClick }: { group: StoryGroup; onClick: () => void }) {
    const f = group.frames[0];
    return (
        <button onClick={onClick} className="relative hidden aspect-[9/16] h-[38vh] max-h-[340px] overflow-hidden rounded-lg opacity-60 transition-opacity hover:opacity-90 lg:block">
            {f.kind === "image" ? <Image src={f.src} alt="" fill sizes="200px" className="object-cover" /> : <span className="absolute inset-0" style={{ background: f.bg }} />}
            <span className="absolute inset-0 bg-black/40" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                <span className="ig-ring p-[2px]"><span className="block rounded-full bg-black p-[2px]"><StoryCover group={group} size={52} /></span></span>
                <span className="text-sm font-semibold">{group.label}</span>
                <span className="text-xs text-white/70">{group.when}</span>
            </span>
        </button>
    );
}

export default function StoryViewer({ ids, start, onClose }: { ids: string[]; start: number; onClose: () => void }) {
    const router = useRouter();
    const groups = ids.map((id) => stories.find((s) => s.id === id)!).filter(Boolean);
    const [gi, setGi] = useState(start);
    const [fi, setFi] = useState(0);
    const [progress, setProgress] = useState(0);
    const [held, setHeld] = useState(false);
    const [busy, setBusy] = useState(false);
    const [reply, setReply] = useState("");
    const [liked, setLiked] = useState(false);
    const pointer = useRef({ x: 0, y: 0, t: 0 });
    const { add: markSeen } = useSeenStories();

    const group = groups[gi];
    const paused = held || busy || reply.length > 0;

    useEffect(() => {
        if (group) markSeen(group.id);
    }, [group, markSeen]);

    const goGroup = useCallback((n: number) => {
        if (n < 0) return;
        if (n >= groups.length) return onClose();
        setProgress(0);
        setGi(n);
        setFi(0);
        setLiked(false);
    }, [groups.length, onClose]);

    const next = useCallback(() => {
        setProgress(0);
        if (fi < group.frames.length - 1) setFi(fi + 1);
        else goGroup(gi + 1);
    }, [fi, gi, group, goGroup]);

    const prev = useCallback(() => {
        setProgress(0);
        if (fi > 0) setFi(fi - 1);
        else if (gi > 0) goGroup(gi - 1);
    }, [fi, gi, goGroup]);

    const nextRef = useRef(next);
    const progressRef = useRef(0);
    useEffect(() => {
        nextRef.current = next;
        progressRef.current = progress;
    });

    useEffect(() => {
        if (paused) return;
        let raf = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const np = Math.min(1, progressRef.current + (now - last) / DURATION);
            last = now;
            progressRef.current = np;
            setProgress(np);
            if (np >= 1) {
                nextRef.current();
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [paused, gi, fi]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName === "INPUT") return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
            if (e.key === " ") setHeld((p) => !p);
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [next, prev, onClose]);

    if (!group) return null;
    const frame = group.frames[fi];

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center gap-6 bg-[#1a1a1a]" role="dialog" aria-modal="true" aria-label={`${group.label} story`}>
            <div className="absolute top-3 left-6 hidden font-script text-[40px] text-white md:block">Niyazion</div>
            <button onClick={onClose} aria-label="Close stories" className="absolute top-4 right-4 z-20 hidden p-2 text-white md:block">
                <X size={28} />
            </button>

            {groups[gi - 1] ? <SidePreview group={groups[gi - 1]} onClick={() => goGroup(gi - 1)} /> : <span className="hidden w-[191px] lg:block" />}

            <div className="relative flex items-center">
                {(gi > 0 || fi > 0) && (
                    <button onClick={prev} aria-label="Previous" className="absolute -left-12 z-20 hidden h-8 w-8 place-items-center rounded-full bg-white/90 text-black md:grid">
                        <ChevronLeft size={20} />
                    </button>
                )}
                <button onClick={next} aria-label="Next" className="absolute -right-12 z-20 hidden h-8 w-8 place-items-center rounded-full bg-white/90 text-black md:grid">
                    <ChevronRight size={20} />
                </button>

                <motion.div
                    key={group.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative h-dvh w-screen overflow-hidden bg-black select-none md:h-[min(92vh,820px)] md:w-auto md:aspect-[9/16] md:rounded-xl"
                >
                    <Frame key={`${gi}-${fi}`} frame={frame} paused={paused} />

                    <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/60 to-transparent px-3 pt-3 pb-8">
                        <div className="flex gap-1">
                            {group.frames.map((_, i) => (
                                <div key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/35">
                                    <div className="h-full bg-white" style={{ width: `${i < fi ? 100 : i === fi ? progress * 100 : 0}%` }} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 flex items-center gap-2.5 text-white">
                            <StoryCover group={group} size={32} />
                            <span className="flex items-center gap-1 text-sm font-semibold">
                                skniyaznoor <Verified size={12} />
                            </span>
                            <span className="text-sm text-white/70">{group.label} · {group.when}</span>
                            <div className="ml-auto flex items-center">
                                <button onClick={() => setHeld((p) => !p)} aria-label={paused ? "Play" : "Pause"} className="p-1.5">
                                    {paused ? <Play size={18} fill="white" /> : <Pause size={18} fill="white" />}
                                </button>
                                <button onClick={onClose} aria-label="Close" className="p-1.5 md:hidden">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tap left third = back, elsewhere = forward, hold = pause, swipe = change story / close */}
                    <div
                        className="absolute inset-0 top-20 bottom-20 z-[5]"
                        onPointerDown={(e) => {
                            pointer.current = { x: e.clientX, y: e.clientY, t: Date.now() };
                            setHeld(true);
                        }}
                        onPointerUp={(e) => {
                            setHeld(false);
                            const dx = e.clientX - pointer.current.x;
                            const dy = e.clientY - pointer.current.y;
                            if (dy > 90 && Math.abs(dy) > Math.abs(dx)) return onClose();
                            if (Math.abs(dx) > 60) return goGroup(dx < 0 ? gi + 1 : gi - 1);
                            if (Date.now() - pointer.current.t > 250) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            if (e.clientX - rect.left < rect.width / 3) prev();
                            else next();
                        }}
                        onPointerLeave={() => setHeld(false)}
                    />

                    {frame.sticker && (
                        <div className={`pointer-events-none absolute inset-x-0 z-[8] flex justify-center [&>*]:pointer-events-auto ${frame.sticker.type === "link" ? "bottom-[92px]" : frame.kind === "image" && (frame.title || frame.caption) ? "top-[22%]" : "bottom-[96px]"}`}>
                            <StickerView sticker={frame.sticker} id={`${group.id}-${fi}`} onClose={onClose} onInteract={setBusy} />
                        </div>
                    )}

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!reply.trim()) return;
                            onClose();
                            router.push(`/messages?text=${encodeURIComponent(`Re your "${group.label}" story: ${reply.trim()}`)}`);
                        }}
                        className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 px-4 pt-6 pb-5"
                    >
                        <input
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Reply to skniyaznoor…"
                            className="min-w-0 flex-1 rounded-full border border-white/50 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/80"
                        />
                        <button type="button" onClick={() => setLiked((l) => !l)} aria-label="Like story" className="text-white">
                            <Heart size={26} className={liked ? "fill-[#ff3040] text-[#ff3040]" : ""} />
                        </button>
                        <button aria-label="Send reply" className="text-white">
                            <Send size={24} />
                        </button>
                    </form>
                </motion.div>
            </div>

            {groups[gi + 1] ? <SidePreview group={groups[gi + 1]} onClick={() => goGroup(gi + 1)} /> : <span className="hidden w-[191px] lg:block" />}
        </div>
    );
}
