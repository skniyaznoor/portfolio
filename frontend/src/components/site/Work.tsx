"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { archive, projects, type Project } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectVisual from "./ProjectVisual";
import ProjectDrawer from "./ProjectDrawer";

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

function FeaturedCard({ project, wide, onOpen }: { project: Project; wide?: boolean; onOpen: () => void }) {
    return (
        <button
            onClick={onOpen}
            className={`group card flex h-full w-full flex-col overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:border-fg/30 hover:shadow-2xl hover:shadow-black/20 ${wide ? "lg:flex-row" : ""}`}
        >
            <div className={`relative overflow-hidden border-line bg-bg/60 ${wide ? "min-h-72 border-b lg:min-h-0 lg:w-[52%] lg:border-r lg:border-b-0" : "h-56 border-b sm:h-64"}`}>
                <ProjectVisual variant={project.visual} />
            </div>
            <div className={`flex flex-1 flex-col p-6 sm:p-7 ${wide ? "lg:p-10" : ""}`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="eyebrow">
                        {project.kind} · {project.period}
                    </span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-all group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                        <ArrowUpRight size={14} />
                    </span>
                </div>
                <h3 className={`font-serif leading-tight ${wide ? "text-3xl sm:text-4xl" : "text-3xl"}`}>{project.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{project.tagline}</p>
                <ul className="mt-5 space-y-2">
                    {project.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5 text-sm text-fg/85">
                            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {h}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {project.stack.slice(0, wide ? 8 : 5).map((s) => (
                        <span key={s} className="chip">{s}</span>
                    ))}
                </div>
            </div>
        </button>
    );
}

export default function Work() {
    const [open, setOpen] = useState<Project | null>(null);
    const close = useCallback(() => setOpen(null), []);

    return (
        <section id="work" className="py-24 md:py-32">
            <div className="container-x">
                <SectionHeading
                    index="01"
                    eyebrow="Selected work"
                    title={
                        <>
                            Things I&apos;ve <span className="italic">built</span>, end to end.
                        </>
                    }
                    intro="From LLM pipelines in production to a WebGL racer and the site that launched my novel. Tap any card for the full case study."
                />

                <div className="grid gap-5 md:grid-cols-2">
                    {featured.map((p, i) => (
                        <Reveal key={p.slug} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                            <FeaturedCard project={p} wide={i === 0} onOpen={() => setOpen(p)} />
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-20">
                    <h3 className="eyebrow mb-6">More professional work</h3>
                    <div className="divide-y divide-line border-y border-line">
                        {more.map((p) => (
                            <button
                                key={p.slug}
                                onClick={() => setOpen(p)}
                                className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-5 text-left transition-colors hover:bg-card/60 sm:grid-cols-[1fr_1.2fr_auto] sm:px-3"
                            >
                                <div>
                                    <div className="font-serif text-2xl leading-tight transition-transform group-hover:translate-x-1">{p.title}</div>
                                    <div className="mt-1 text-sm text-muted sm:hidden">{p.tagline}</div>
                                </div>
                                <div className="hidden text-sm text-muted sm:block">{p.tagline}</div>
                                <div className="flex items-center gap-3">
                                    <span className="hidden font-mono text-xs text-muted md:inline">{p.stack.slice(0, 2).join(" · ")}</span>
                                    <ArrowUpRight size={16} className="text-muted transition-all group-hover:rotate-45 group-hover:text-accent" />
                                </div>
                            </button>
                        ))}
                    </div>
                </Reveal>

                <Reveal className="mt-14">
                    <h3 className="eyebrow mb-5">From the archive</h3>
                    <div className="flex flex-wrap gap-2">
                        {archive.map((a) =>
                            a.repo ? (
                                <a key={a.title} href={a.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-fg">
                                    <Github size={13} /> {a.title} <span className="font-mono text-[11px] text-muted">{a.stack}</span>
                                </a>
                            ) : (
                                <span key={a.title} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm">
                                    {a.title} <span className="font-mono text-[11px] text-muted">{a.stack}</span>
                                </span>
                            )
                        )}
                    </div>
                </Reveal>
            </div>

            <ProjectDrawer project={open} onClose={close} />
        </section>
    );
}
