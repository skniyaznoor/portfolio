"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Pin, Smile } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { hashtag, postMeta } from "@/data/instagram";
import { Avatar, Verified } from "./bits";
import PostCarousel from "./PostCarousel";
import PostActions, { LikeLine } from "./PostActions";
import { useLikes } from "./store";

function Comment({ id, children, pinned, when }: { id: string; children: React.ReactNode; pinned?: boolean; when: string }) {
    const likes = useLikes();
    const liked = likes.has(id);
    return (
        <div className="flex gap-3 py-2.5">
            <div className="shrink-0">
                <Avatar size={32} />
            </div>
            <div className="min-w-0 flex-1 text-sm leading-[1.45]">
                {pinned && (
                    <div className="mb-0.5 flex items-center gap-1 text-xs text-muted">
                        <Pin size={11} /> Pinned
                    </div>
                )}
                {children}
                <div className="mt-1.5 flex gap-3 text-xs text-muted">
                    <span>{when}</span>
                    {liked && <span className="font-semibold">1 like</span>}
                </div>
            </div>
            <button onClick={() => likes.toggle(id)} aria-label="Like comment" className="self-start pt-1.5">
                <Heart size={12} className={liked ? "fill-[#ff3040] text-[#ff3040]" : "text-muted"} />
            </button>
        </div>
    );
}

export default function PostDetail({ project, variant }: { project: Project; variant: "modal" | "page" }) {
    const likes = useLikes();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState("");
    const meta = postMeta[project.slug];

    const header = (
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <Avatar size={32} ring="story" />
            <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-center gap-1 text-sm font-semibold">
                    skniyaznoor <Verified size={12} />
                </div>
                {meta && <div className="truncate text-xs text-muted">{meta.location}</div>}
            </div>
            {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent">Visit</a>
            )}
        </div>
    );

    const comments = (
        <div className="px-4 py-2">
            <Comment id={`${project.slug}#caption`} when={project.period}>
                <Link href="/profile" className="mr-1.5 font-semibold">skniyaznoor</Link>
                <span className="font-semibold">{project.title}</span>. {project.summary}
                <span className="mt-2 block text-[#00376b] dark:text-[#e0f1ff]">{project.stack.map(hashtag).join(" ")}</span>
            </Comment>
            {project.sections.map((s, i) => (
                <Comment key={s.heading} id={`${project.slug}#${i}`} pinned={i === 0} when={project.period}>
                    <span className="mr-1.5 font-semibold">skniyaznoor</span>
                    <span className="font-semibold">{s.heading}</span>
                    <ul className="mt-1.5 space-y-1.5">
                        {s.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                                <span className="text-muted">•</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </Comment>
            ))}
        </div>
    );

    const footer = (
        <div className="border-t border-line">
            <div className="px-4">
                <PostActions slug={project.slug} title={project.title} onComment={() => inputRef.current?.focus()} />
                <LikeLine slug={project.slug} />
                {meta && <div className="mt-0.5 text-sm font-semibold">{meta.metric}</div>}
                <div className="mt-1 mb-3 text-[10px] tracking-wide text-muted uppercase">{project.period}</div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/messages?about=${project.slug}&text=${encodeURIComponent(text)}`);
                }}
                className="flex items-center gap-3 border-t border-line px-4 py-3"
            >
                <Smile size={24} className="shrink-0 text-muted" />
                <input
                    ref={inputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ask me about this project…"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                />
                <button disabled={!text.trim()} className="text-sm font-semibold text-accent disabled:opacity-40">Send</button>
            </form>
        </div>
    );

    const onDoubleTap = () => !likes.has(project.slug) && likes.toggle(project.slug);

    if (variant === "modal") {
        return (
            <div className="flex h-full w-full flex-col overflow-y-auto bg-card md:flex-row md:overflow-hidden">
                <div className="md:hidden">{header}</div>
                <div className="shrink-0 bg-black md:flex md:w-[min(60vw,calc(92vh*0.8))] md:items-center">
                    <div className="w-full pb-8 md:pb-0">
                        <PostCarousel project={project} onDoubleTap={onDoubleTap} />
                    </div>
                </div>
                <div className="flex flex-col md:min-h-0 md:w-[405px] md:flex-none">
                    <div className="hidden md:block">{header}</div>
                    <div className="md:min-h-0 md:flex-1 md:overflow-y-auto">{comments}</div>
                    {footer}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[935px] md:py-8">
            <div className="flex flex-col overflow-hidden border-line md:flex-row md:border">
                <div className="md:hidden">{header}</div>
                <div className="bg-black pb-8 md:w-[57%] md:pb-0">
                    <PostCarousel project={project} onDoubleTap={onDoubleTap} />
                </div>
                <div className="flex flex-col md:w-[43%]">
                    <div className="hidden md:block">{header}</div>
                    <div className="md:max-h-[520px] md:flex-1 md:overflow-y-auto">{comments}</div>
                    {footer}
                </div>
            </div>
        </div>
    );
}
