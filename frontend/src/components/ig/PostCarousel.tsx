"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Github, Globe, Heart } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { postMeta } from "@/data/instagram";
import ProjectVisual from "./ProjectVisual";

const slideBg: Record<Project["kind"], string> = {
    Professional: "linear-gradient(150deg,#4f5bd5 0%,#962fbf 55%,#d62976 100%)",
    Personal: "linear-gradient(150deg,#fa7e1e 0%,#d62976 60%,#962fbf 100%)",
    Freelance: "linear-gradient(150deg,#11998e 0%,#0f3d3e 100%)",
};

function Slides({ project }: { project: Project }) {
    const meta = postMeta[project.slug];
    const slides = [
        <div key="cover" className="h-full w-full bg-card">
            <ProjectVisual variant={project.visual} />
        </div>,
        <div key="highlights" className="flex h-full w-full flex-col justify-center p-7 text-white sm:p-10" style={{ background: slideBg[project.kind] }}>
            <div className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">{project.kind} · {project.period}</div>
            <h3 className="mt-2 text-2xl leading-tight font-bold sm:text-3xl">{project.title}</h3>
            <p className="mt-2 text-sm text-white/80">{project.tagline}</p>
            <ul className="mt-6 space-y-2.5">
                {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 rounded-xl bg-white/12 px-3.5 py-2.5 text-[13px] font-medium backdrop-blur sm:text-sm">
                        <span>✦</span> {h}
                    </li>
                ))}
            </ul>
        </div>,
        <div key="stack" className="flex h-full w-full flex-col justify-center bg-[#0a0a0a] p-7 text-white sm:p-10">
            <div className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Built with</div>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/20 px-3 py-1.5 text-[13px]">{s}</span>
                ))}
            </div>
            {meta && <div className="ig-gradient-text mt-8 text-xl leading-snug font-bold sm:text-2xl">{meta.metric}</div>}
        </div>,
    ];
    if (project.live || project.repo) {
        slides.push(
            <div key="links" className="flex h-full w-full flex-col items-center justify-center gap-4 bg-card p-8 text-center">
                <div className="text-4xl">🔗</div>
                <div className="text-lg font-semibold">See it for yourself</div>
                <div className="flex flex-wrap justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-ig">
                            <Globe size={15} /> Visit live
                        </a>
                    )}
                    {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ig-muted">
                            <Github size={15} /> Source code
                        </a>
                    )}
                </div>
            </div>
        );
    }
    return slides;
}

export default function PostCarousel({ project, onDoubleTap, aspect = "aspect-[4/5]" }: { project: Project; onDoubleTap: () => void; aspect?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [heart, setHeart] = useState(0);
    const lastTap = useRef(0);
    const slides = Slides({ project });

    const go = (i: number) => {
        const el = ref.current;
        if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    };

    const onTap = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            onDoubleTap();
            setHeart((h) => h + 1);
        }
        lastTap.current = now;
    };

    return (
        <div className="relative">
            <div
                ref={ref}
                onClick={onTap}
                onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
                className={`no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${aspect}`}
            >
                {slides.map((s, i) => (
                    <div key={i} className="h-full w-full shrink-0 snap-center snap-always overflow-hidden">
                        {s}
                    </div>
                ))}
            </div>

            {heart > 0 && (
                <div key={heart} className="pointer-events-none absolute inset-0 grid place-items-center">
                    <Heart size={96} className="animate-like-pop fill-white text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]" />
                </div>
            )}

            {index > 0 && (
                <button onClick={() => go(index - 1)} aria-label="Previous slide" className="absolute top-1/2 left-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-black shadow">
                    <ChevronLeft size={16} />
                </button>
            )}
            {index < slides.length - 1 && (
                <button onClick={() => go(index + 1)} aria-label="Next slide" className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-black shadow">
                    <ChevronRight size={16} />
                </button>
            )}
            <div className="absolute top-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                {index + 1}/{slides.length}
            </div>
            <div className="pointer-events-none absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-1">
                {slides.map((_, i) => (
                    <span key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-muted/40"}`} />
                ))}
            </div>
        </div>
    );
}
