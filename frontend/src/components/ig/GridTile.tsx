"use client";

import { Heart, Layers, MessageCircle } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { useIg } from "./IgProvider";
import ProjectVisual from "./ProjectVisual";
import ScaledBox from "./ScaledBox";
import { useLikes } from "./store";

export default function GridTile({ project, className = "aspect-[3/4]" }: { project: Project; className?: string }) {
    const { openPost } = useIg();
    const likes = useLikes();
    return (
        <button onClick={() => openPost(project.slug)} className={`group relative block w-full overflow-hidden bg-card ${className}`} aria-label={project.title}>
            <ScaledBox width={420} height={520}>
                <ProjectVisual variant={project.visual} />
            </ScaledBox>
            <Layers size={18} className="absolute top-2 right-2 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45 p-3 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
                <div className="text-sm leading-tight font-bold sm:text-base">{project.title}</div>
                <div className="flex items-center gap-5 text-sm font-bold">
                    <span className="flex items-center gap-1.5">
                        <Heart size={18} className={likes.has(project.slug) ? "fill-white" : ""} /> {likes.has(project.slug) ? 1 : 0}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MessageCircle size={18} className="-scale-x-100 fill-white" /> {project.sections.length + 1}
                    </span>
                </div>
            </div>
        </button>
    );
}
