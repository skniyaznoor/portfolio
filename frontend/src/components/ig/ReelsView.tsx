"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, ChevronDown, ChevronUp, Heart, MessageCircle, MoreHorizontal, Music2, Send } from "lucide-react";
import { book, profile, projects, type Project } from "@/data/portfolio";
import { postMeta } from "@/data/instagram";
import { Avatar, Verified } from "./bits";
import { useIg } from "./IgProvider";
import { useShare } from "./PostActions";
import { useLikes, useSaves } from "./store";

function useTicker(active: boolean, length: number, ms = 2400) {
    const [i, setI] = useState(0);
    useEffect(() => {
        if (!active) return;
        const id = setInterval(() => setI((n) => (n + 1) % length), ms);
        return () => clearInterval(id);
    }, [active, length, ms]);
    return active ? i : 0;
}

function Subtitles({ lines, active }: { lines: string[]; active: boolean }) {
    const i = useTicker(active, lines.length);
    return (
        <div className="absolute top-[56%] right-16 left-4 flex justify-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-xl bg-black/55 px-4 py-2.5 text-center text-lg leading-snug font-extrabold text-white backdrop-blur-sm"
                >
                    {lines[i]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

const chat = [
    { me: true, text: "Which contracts mention redistribution limits?" },
    { me: false, text: "Two do: Vendor-A §4.2 and Vendor-C §7.1 [1][2]" },
    { me: true, text: "Did the latest email change any of them?" },
    { me: false, text: "Yes. A renewal email proposes a new display-rights clause. Review the diff?" },
];

function AiScene({ active, image }: { active: boolean; image: string }) {
    const n = useTicker(active, chat.length + 2, 1600);
    return (
        <div className="absolute inset-0 isolate flex flex-col justify-center gap-3 px-5 pb-40">
            <Image src={image} alt="" fill sizes="480px" className="-z-10 scale-110 object-cover blur-md brightness-[0.35]" />
            <div className="mb-2 text-center font-mono text-[11px] tracking-widest text-white/50">CLAUDE · RAG · GROUNDED</div>
            {chat.slice(0, Math.min(n + 1, chat.length)).map((m, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm text-white ${m.me ? "ml-auto rounded-br-sm bg-[#3797f0]" : "rounded-bl-sm bg-[#262626]"}`}
                >
                    {m.text}
                </motion.div>
            ))}
            {n < chat.length && n % 2 === 0 && (
                <div className="flex w-14 gap-1 rounded-2xl bg-[#262626] px-3 py-3">
                    {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                </div>
            )}
        </div>
    );
}

function ImageScene({ project, active }: { project: Project; active: boolean }) {
    const i = useTicker(active, project.images.length, 3600);
    return (
        <div className="absolute inset-0 overflow-hidden bg-black">
            <AnimatePresence>
                <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: active ? 1.18 : 1.08 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 0.8 }, scale: { duration: 6, ease: "linear" } }}
                >
                    <Image src={project.images[i]} alt="" fill sizes="(max-width: 768px) 100vw, 480px" className="object-cover" priority={i === 0} />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />
        </div>
    );
}

function Reel({ project, active }: { project: Project; active: boolean }) {
    const { openPost } = useIg();
    const likes = useLikes();
    const saves = useSaves();
    const share = useShare();
    const [expanded, setExpanded] = useState(false);
    const [heart, setHeart] = useState(0);
    const lastTap = useRef(0);
    const liked = likes.has(project.slug);

    const lines = project.visual === "author" ? book.blurb.concat(book.hook) : project.highlights;

    const onTap = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            if (!liked) likes.toggle(project.slug);
            setHeart((h) => h + 1);
        }
        lastTap.current = now;
    };

    const action = "flex flex-col items-center gap-1 text-xs font-semibold";

    return (
        <section className="relative h-full w-full snap-start snap-always overflow-hidden bg-black text-white md:rounded-lg" aria-label={project.title}>
            <div className="absolute inset-0" onClick={onTap}>
                {project.visual === "ai" ? <AiScene active={active} image={project.images[0]} /> : <ImageScene project={project} active={active} />}
                {project.visual !== "ai" && <Subtitles lines={lines} active={active} />}
            </div>

            {heart > 0 && (
                <div key={heart} className="pointer-events-none absolute inset-0 grid place-items-center">
                    <Heart size={110} className="animate-like-pop fill-white text-white" />
                </div>
            )}

            <div className="absolute top-4 left-4 text-xl font-bold drop-shadow md:hidden">Reels</div>

            <div className="absolute right-3 bottom-6 flex flex-col items-center gap-5">
                <button onClick={() => likes.toggle(project.slug)} className={action} aria-label="Like">
                    <Heart size={28} className={liked ? "fill-[#ff3040] text-[#ff3040]" : ""} />
                    {liked ? "1" : "Like"}
                </button>
                <button onClick={() => openPost(project.slug)} className={action} aria-label="Comments">
                    <MessageCircle size={28} className="-scale-x-100" />
                    {project.sections.length + 1}
                </button>
                <button onClick={() => share(project.slug, project.title)} className={action} aria-label="Share">
                    <Send size={26} />
                    Share
                </button>
                <button onClick={() => saves.toggle(project.slug)} className={action} aria-label="Save">
                    <Bookmark size={26} className={saves.has(project.slug) ? "fill-white" : ""} />
                </button>
                <Link href={`/p/${project.slug}`} aria-label="Open post" className={action}>
                    <MoreHorizontal size={24} />
                </Link>
                <span className="relative block h-7 w-7 overflow-hidden rounded-md border-2 border-white">
                    <Image src={profile.avatar} alt="" fill sizes="56px" className="object-cover" />
                </span>
            </div>

            <div className="absolute right-16 bottom-5 left-4">
                <div className="flex items-center gap-2.5">
                    <Avatar size={32} />
                    <span className="flex items-center gap-1 text-sm font-semibold">skniyaznoor <Verified size={12} /></span>
                    <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/60 px-2.5 py-1 text-xs font-semibold">Follow</a>
                </div>
                <button onClick={() => setExpanded(!expanded)} className={`mt-3 block text-left text-sm leading-snug ${expanded ? "" : "line-clamp-2"}`}>
                    <span className="font-semibold">{project.title}</span> · {project.tagline}. {expanded && project.summary}
                </button>
                {postMeta[project.slug] && <div className="mt-1.5 text-xs font-semibold text-white/80">{postMeta[project.slug].metric}</div>}
                <div className="mt-2.5 flex max-w-[220px] items-center gap-2 overflow-hidden text-xs">
                    <Music2 size={13} className="shrink-0" />
                    <div className="overflow-hidden">
                        <div className={`flex w-max gap-8 whitespace-nowrap ${active ? "animate-marquee" : ""}`}>
                            <span>skniyaznoor · Original audio · {project.stack.slice(0, 3).join(" · ")}</span>
                            <span>skniyaznoor · Original audio · {project.stack.slice(0, 3).join(" · ")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ReelsView() {
    const params = useSearchParams();
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const start = Number(params.get("i") ?? 0);
        if (start > 0) el.scrollTo({ top: start * el.clientHeight });
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(Array.from(el.children).indexOf(e.target));
                }),
            { root: el, threshold: 0.6 }
        );
        Array.from(el.children).forEach((c) => observer.observe(c));
        return () => observer.disconnect();
    }, [params]);

    const go = (dir: number) => {
        const el = ref.current;
        if (el) el.scrollBy({ top: dir * el.clientHeight, behavior: "smooth" });
    };

    return (
        <div className="relative flex h-[calc(100dvh-50px)] justify-center bg-black md:h-dvh md:bg-bg md:py-4">
            <div ref={ref} className="no-scrollbar h-full w-full snap-y snap-mandatory overflow-y-scroll md:aspect-[9/16] md:w-auto md:space-y-4">
                {projects.map((p, i) => (
                    <div key={p.slug} className="h-full w-full">
                        <Reel project={p} active={i === active} />
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 right-8 hidden -translate-y-1/2 flex-col gap-3 md:flex">
                <button onClick={() => go(-1)} disabled={active === 0} aria-label="Previous reel" className="grid h-12 w-12 place-items-center rounded-full bg-elevated disabled:opacity-30">
                    <ChevronUp size={24} />
                </button>
                <button onClick={() => go(1)} disabled={active === projects.length - 1} aria-label="Next reel" className="grid h-12 w-12 place-items-center rounded-full bg-elevated disabled:opacity-30">
                    <ChevronDown size={24} />
                </button>
            </div>
        </div>
    );
}
