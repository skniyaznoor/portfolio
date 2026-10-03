"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { hashtag, postMeta } from "@/data/instagram";
import { Avatar, Verified } from "./bits";
import { useIg } from "./IgProvider";
import PostCarousel from "./PostCarousel";
import PostActions, { LikeLine, useShare } from "./PostActions";
import { useLikes, useSeenStories } from "./store";
import Sheet from "./Sheet";

export default function PostCard({ project }: { project: Project }) {
    const { openPost, openStories } = useIg();
    const likes = useLikes();
    const seen = useSeenStories();
    const share = useShare();
    const [expanded, setExpanded] = useState(false);
    const [menu, setMenu] = useState(false);
    const meta = postMeta[project.slug];

    return (
        <article className="border-b border-line pb-5 md:mb-4 md:pb-6">
            <header className="flex items-center gap-3 px-3 py-3 md:px-0">
                <button onClick={() => openStories(["now"], 0)} aria-label="View story">
                    <Avatar size={32} ring={seen.has("now") ? "seen" : "story"} />
                </button>
                <div className="min-w-0 flex-1 leading-tight">
                    <div className="flex items-center gap-1 text-sm">
                        <Link href="/profile" className="font-semibold hover:opacity-70">skniyaznoor</Link>
                        <Verified size={12} />
                        <span className="text-muted">• {project.period}</span>
                    </div>
                    {meta && <div className="truncate text-xs">{meta.location}</div>}
                </div>
                <button onClick={() => setMenu(true)} aria-label="More options" className="p-1">
                    <MoreHorizontal size={20} />
                </button>
            </header>

            <div className="overflow-hidden border-line md:rounded-[4px] md:border">
                <PostCarousel project={project} onDoubleTap={() => !likes.has(project.slug) && likes.toggle(project.slug)} />
            </div>

            <div className="mt-1 px-3 md:px-0">
                <PostActions slug={project.slug} title={project.title} onComment={() => openPost(project.slug)} />
                <LikeLine slug={project.slug} />
                {meta && <div className="mt-1 text-sm font-semibold">{meta.metric}</div>}
                <div className="mt-1.5 text-sm leading-[1.45]">
                    <Link href="/profile" className="mr-1.5 font-semibold">skniyaznoor</Link>
                    <span className="font-semibold">{project.title}</span> · {project.tagline}.{" "}
                    {expanded ? (
                        <>
                            {project.summary}
                            <span className="mt-1 block text-[#00376b] dark:text-[#e0f1ff]">
                                {project.stack.map(hashtag).join(" ")}
                            </span>
                        </>
                    ) : (
                        <button onClick={() => setExpanded(true)} className="text-muted">
                            … more
                        </button>
                    )}
                </div>
                <button onClick={() => openPost(project.slug)} className="mt-1.5 text-sm text-muted">
                    View the full case study ({project.sections.length} {project.sections.length === 1 ? "section" : "sections"})
                </button>
            </div>

            <Sheet open={menu} onClose={() => setMenu(false)}>
                <Link href={`/p/${project.slug}`} className="block py-3.5 text-center text-sm font-semibold">Go to post</Link>
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="block py-3.5 text-center text-sm">Visit live site</a>}
                {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="block py-3.5 text-center text-sm">View source on GitHub</a>}
                <button onClick={() => { share(project.slug, project.title); setMenu(false); }} className="block w-full py-3.5 text-center text-sm">Share to…</button>
                <Link href={`/messages?about=${project.slug}`} className="block py-3.5 text-center text-sm">Ask about this project</Link>
            </Sheet>
        </article>
    );
}
