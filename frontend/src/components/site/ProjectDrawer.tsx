"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

export default function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
    useEffect(() => {
        if (!project) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                        className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-3xl border-t border-line bg-bg md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[640px] md:rounded-none md:border-t-0 md:border-l"
                        initial={{ y: "100%", x: 0 }}
                        animate={{ y: 0, x: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 36 }}
                    >
                        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-line md:hidden" />
                        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
                            <div>
                                <div className="eyebrow mb-2">
                                    {project.kind} · {project.period}
                                </div>
                                <h3 className="font-serif text-3xl leading-tight md:text-4xl">{project.title}</h3>
                                <p className="mt-1 text-sm text-muted">{project.tagline}</p>
                            </div>
                            <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line hover:border-fg">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-8">
                            <p className="leading-relaxed text-fg/90">{project.summary}</p>

                            {(project.live || project.repo) && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-solid !py-2">
                                            Visit live <ArrowUpRight size={14} />
                                        </a>
                                    )}
                                    {project.repo && (
                                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2">
                                            <Github size={14} /> Source
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="mt-6 flex flex-wrap gap-1.5">
                                {project.stack.map((s) => (
                                    <span key={s} className="chip">{s}</span>
                                ))}
                            </div>

                            {project.sections.map((section, si) => (
                                <section key={section.heading} className="mt-9">
                                    <h4 className="mb-4 flex items-center gap-3 text-sm font-semibold">
                                        <span className="font-mono text-xs text-accent">0{si + 1}</span>
                                        {section.heading}
                                    </h4>
                                    <ul className="space-y-3 border-l border-line pl-5">
                                        {section.bullets.map((b) => (
                                            <li key={b} className="relative text-[15px] leading-relaxed text-muted before:absolute before:top-[0.65em] before:-left-[23px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-accent">
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                            <div className="h-8" />
                        </div>
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
