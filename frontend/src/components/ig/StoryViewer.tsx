"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { stories, type StoryFrame } from "@/data/instagram";
import { StoryCover, Verified } from "./bits";
import { useSeenStories } from "./store";

const DURATION = 5000;

function Frame({ frame }: { frame: StoryFrame }) {
    if (frame.kind === "image") {
        return (
            <div className="absolute inset-0 bg-black">
                <Image src={frame.src} alt="" fill sizes="420px" className="object-contain" priority />
                {frame.caption && (
                    <div className="absolute inset-x-0 bottom-24 flex justify-center px-6">
                        <span className="rounded-lg bg-black/60 px-3 py-1.5 text-center text-sm font-semibold text-white backdrop-blur">{frame.caption}</span>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="absolute inset-0 flex flex-col justify-center px-8 text-white" style={{ background: frame.bg }}>
            {frame.kind === "text" && (
                <>
                    {frame.eyebrow && <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">{frame.eyebrow}</div>}
                    <h3 className="text-3xl leading-tight font-bold">{frame.title}</h3>
                    {frame.body && <p className="mt-4 text-base leading-relaxed text-white/85">{frame.body}</p>}
                </>
            )}
            {frame.kind === "stat" && (
                <>
                    <div className="text-[88px] leading-none font-black tracking-tight">{frame.value}</div>
                    <div className="mt-2 text-xl font-semibold">{frame.label}</div>
                    {frame.body && <p className="mt-4 text-base text-white/80">{frame.body}</p>}
                </>
            )}
            {frame.kind === "list" && (
                <>
                    <h3 className="mb-6 text-2xl font-bold">{frame.title}</h3>
                    <ul className="space-y-3">
                        {frame.items.map((it, i) => (
                            <li key={it} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-[15px] font-medium backdrop-blur">
                                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-black">{i + 1}</span>
                                {it}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default function StoryViewer({ ids, start, onClose }: { ids: string[]; start: number; onClose: () => void }) {
    const groups = ids.map((id) => stories.find((s) => s.id === id)!).filter(Boolean);
    const [gi, setGi] = useState(start);
    const [fi, setFi] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const holdStart = useRef(0);
    const { add: markSeen } = useSeenStories();

    const group = groups[gi];

    useEffect(() => {
        if (group) markSeen(group.id);
    }, [group, markSeen]);

    const next = useCallback(() => {
        setProgress(0);
        if (fi < group.frames.length - 1) setFi(fi + 1);
        else if (gi < groups.length - 1) {
            setGi(gi + 1);
            setFi(0);
        } else onClose();
    }, [fi, gi, group, groups.length, onClose]);

    const prev = useCallback(() => {
        setProgress(0);
        if (fi > 0) setFi(fi - 1);
        else if (gi > 0) {
            setGi(gi - 1);
            setFi(0);
        }
    }, [fi, gi]);

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
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
            if (e.key === " ") setPaused((p) => !p);
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
    const external = group.cta?.href.startsWith("http") || group.cta?.href.endsWith(".pdf");

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#1a1a1a]" role="dialog" aria-modal="true" aria-label={`${group.label} story`}>
            <div className="absolute top-5 left-6 hidden font-script text-3xl text-white md:block">Niyazion</div>
            <button onClick={onClose} aria-label="Close stories" className="absolute top-4 right-4 z-20 hidden p-2 text-white md:block">
                <X size={28} />
            </button>

            {gi > 0 || fi > 0 ? (
                <button onClick={prev} aria-label="Previous" className="absolute left-[calc(50%-260px)] z-20 hidden h-8 w-8 place-items-center rounded-full bg-white/90 text-black md:grid">
                    <ChevronLeft size={20} />
                </button>
            ) : null}
            <button onClick={next} aria-label="Next" className="absolute right-[calc(50%-260px)] z-20 hidden h-8 w-8 place-items-center rounded-full bg-white/90 text-black md:grid">
                <ChevronRight size={20} />
            </button>

            <div className="relative h-dvh w-full overflow-hidden bg-black select-none md:h-[min(92vh,820px)] md:w-auto md:aspect-[9/16] md:rounded-xl">
                <Frame key={`${gi}-${fi}`} frame={frame} />

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
                        <span className="text-sm text-white/70">{group.label}</span>
                        <div className="ml-auto flex items-center">
                            <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play" : "Pause"} className="p-1.5">
                                {paused ? <Play size={18} fill="white" /> : <Pause size={18} fill="white" />}
                            </button>
                            <button onClick={onClose} aria-label="Close" className="p-1.5 md:hidden">
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tap left third to go back, rest to go forward; hold to pause */}
                <div
                    className="absolute inset-0 top-20 bottom-24 z-[5] flex"
                    onPointerDown={() => {
                        holdStart.current = Date.now();
                        setPaused(true);
                    }}
                    onPointerUp={(e) => {
                        setPaused(false);
                        if (Date.now() - holdStart.current > 250) return;
                        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                        if (e.clientX - rect.left < rect.width / 3) prev();
                        else next();
                    }}
                    onPointerLeave={() => setPaused(false)}
                />

                {group.cta && (
                    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-black/60 to-transparent px-6 pt-10 pb-8">
                        {external ? (
                            <a href={group.cta.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg">
                                {group.cta.label} ↗
                            </a>
                        ) : (
                            <Link href={group.cta.href} onClick={onClose} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg">
                                {group.cta.label} →
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
