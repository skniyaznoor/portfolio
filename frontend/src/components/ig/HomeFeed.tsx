"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import { feedStoryIds } from "@/data/instagram";
import type { Repo } from "@/lib/github";
import { Avatar, Verified } from "./bits";
import PostCard from "./PostCard";
import StoryTray from "./StoryTray";

const langColor: Record<string, string> = { TypeScript: "#3178c6", JavaScript: "#f1e05a", PHP: "#4f5d95", Python: "#3572a5", HTML: "#e34c26" };

function Suggestions({ repos }: { repos: Repo[] }) {
    return (
        <aside className="hidden w-[319px] shrink-0 pt-9 pl-16 lg:block">
            <div className="flex items-center gap-3">
                <Link href="/profile"><Avatar size={44} /></Link>
                <div className="min-w-0 flex-1 leading-tight">
                    <Link href="/profile" className="flex items-center gap-1 text-sm font-semibold">skniyaznoor <Verified size={12} /></Link>
                    <div className="truncate text-sm text-muted">{profile.name}</div>
                </div>
                <a href={profile.resume} download className="text-xs font-semibold text-accent hover:text-fg">Resume</a>
            </div>

            <div className="mt-6 mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-muted">On GitHub</span>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:text-muted">See all</a>
            </div>
            <ul className="space-y-3">
                {repos.slice(0, 5).map((r) => (
                    <li key={r.name} className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-elevated">
                            <span className="h-3 w-3 rounded-full" style={{ background: langColor[r.language ?? ""] ?? "var(--muted)" }} />
                        </span>
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 leading-tight">
                            <div className="truncate text-sm font-semibold">{r.name}</div>
                            <div className="truncate text-xs text-muted">{r.description ?? r.language ?? "Repository"}</div>
                        </a>
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-accent hover:text-fg">View</a>
                    </li>
                ))}
            </ul>

            <div className="mt-6 mb-3 text-sm font-semibold text-muted">Also find me on</div>
            <div className="flex flex-wrap gap-2">
                {[
                    ["LinkedIn", profile.links.linkedin],
                    ["niyazunveiled.com", profile.links.website],
                    ["Instagram", profile.links.instagram],
                ].map(([l, h]) => (
                    <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-3 py-1 text-xs hover:bg-hover">{l}</a>
                ))}
            </div>

            <p className="mt-8 text-xs leading-relaxed text-muted/70">
                About · Resume · GitHub · Writing · Coffee?
                <br />
                <br />© {new Date().getFullYear()} NIYAZION FROM SK NIYAZ NOOR
            </p>
        </aside>
    );
}

export default function HomeFeed({ repos }: { repos: Repo[] }) {
    return (
        <div className="flex justify-center md:pt-4">
            <div className="w-full max-w-[470px]">
                <StoryTray ids={feedStoryIds} />
                <div className="mt-1 md:mt-4">
                    {projects.map((p) => (
                        <PostCard key={p.slug} project={p} />
                    ))}
                </div>
                <div className="flex flex-col items-center px-6 py-14 text-center">
                    <span className="ig-ring grid h-20 w-20 place-items-center p-[2px]">
                        <span className="grid h-full w-full place-items-center rounded-full bg-bg">
                            <CheckCircle2 size={44} strokeWidth={1.5} className="text-[#d62976]" />
                        </span>
                    </span>
                    <p className="mt-4 text-xl">You&apos;re all caught up</p>
                    <p className="mt-1 text-sm text-muted">You&apos;ve seen every project. Want to talk?</p>
                    <Link href="/messages" className="mt-3 text-sm font-semibold text-accent">Send me a message</Link>
                </div>
            </div>
            <Suggestions repos={repos} />
        </div>
    );
}
