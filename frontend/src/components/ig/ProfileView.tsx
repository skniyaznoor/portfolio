"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Clapperboard, Download, Github, Grid3x3, Link2, Moon, Play, Star, Sun, UserSquare2 } from "lucide-react";
import { book, profile, projects, writing } from "@/data/portfolio";
import { account, highlightIds } from "@/data/instagram";
import type { Repo } from "@/lib/github";
import { Avatar, Verified } from "./bits";
import { MobileHeader } from "./AppShell";
import { useIg } from "./IgProvider";
import GridTile from "./GridTile";
import StoryTray from "./StoryTray";
import ScaledBox from "./ScaledBox";
import ProjectVisual from "./ProjectVisual";
import Sheet from "./Sheet";
import { toggleTheme, useSaves, useSeenStories } from "./store";

type Tab = "posts" | "reels" | "saved" | "github" | "writing";

const tabs: { id: Tab; label: string; icon: typeof Grid3x3 }[] = [
    { id: "posts", label: "Posts", icon: Grid3x3 },
    { id: "reels", label: "Reels", icon: Clapperboard },
    { id: "github", label: "GitHub", icon: Github },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "writing", label: "Writing", icon: UserSquare2 },
];

const writingBg = [
    "linear-gradient(160deg,#833ab4,#fd1d1d 60%,#fcb045)",
    "linear-gradient(160deg,#0b0806,#7a4a26)",
    "linear-gradient(160deg,#4f5bd5,#d62976)",
    "linear-gradient(160deg,#0f2027,#2c5364)",
    "linear-gradient(160deg,#11998e,#0f3d3e)",
    "linear-gradient(160deg,#1c1c1c,#4a4a4a)",
];

const langColor: Record<string, string> = { TypeScript: "#3178c6", JavaScript: "#f1e05a", PHP: "#4f5d95", Python: "#3572a5", HTML: "#e34c26" };

function Empty({ icon: Icon, title, body }: { icon: typeof Grid3x3; title: string; body: string }) {
    return (
        <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-fg">
                <Icon size={30} strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 text-2xl font-extrabold">{title}</h3>
            <p className="mt-2 max-w-xs text-sm text-muted">{body}</p>
        </div>
    );
}

export default function ProfileView({ repos }: { repos: Repo[] }) {
    const { openStories } = useIg();
    const seen = useSeenStories();
    const saves = useSaves();
    const [tab, setTab] = useState<Tab>("posts");
    const [links, setLinks] = useState(false);

    const actions = (
        <div className="flex gap-2">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-ig flex-1 md:flex-none">Follow</a>
            <Link href="/messages" className="btn-ig-muted flex-1 md:flex-none">Message</Link>
            <a href={profile.resume} download className="btn-ig-muted flex-1 md:flex-none">
                <Download size={15} /> Resume
            </a>
        </div>
    );

    const bio = (
        <div className="text-sm leading-[1.45]">
            <div className="font-semibold">{profile.name}</div>
            <div className="text-muted">{account.category}</div>
            {account.bio.map((l) => (
                <div key={l}>{l}</div>
            ))}
            <button onClick={() => setLinks(true)} className="mt-1 flex items-center gap-1 font-semibold text-[#00376b] dark:text-[#e0f1ff]">
                <Link2 size={14} className="-rotate-45" /> niyazunveiled.com and 3 more
            </button>
        </div>
    );

    return (
        <div>
            <MobileHeader
                title={<>skniyaznoor <Verified size={13} /></>}
                right={
                    <button onClick={toggleTheme} aria-label="Switch appearance" className="p-1">
                        <Sun size={22} className="hidden dark:block" />
                        <Moon size={22} className="dark:hidden" />
                    </button>
                }
            />

            <div className="mx-auto max-w-[935px] md:px-5 md:pt-8">
                <header className="px-4 pt-4 md:flex md:items-start md:gap-[clamp(2rem,8vw,6rem)] md:px-12 md:pt-0">
                    <div className="flex items-center gap-6 md:block">
                        <button onClick={() => openStories(["now"], 0)} aria-label="View story" className="shrink-0">
                            <span className="md:hidden"><Avatar size={86} ring={seen.has("now") ? "seen" : "story"} /></span>
                            <span className="hidden md:block"><Avatar size={150} ring={seen.has("now") ? "seen" : "story"} /></span>
                        </button>
                        <ul className="flex flex-1 justify-around text-center md:hidden">
                            {account.stats.map((s) => (
                                <li key={s.label} className="leading-tight">
                                    <div className="font-semibold">{s.value}</div>
                                    <div className="text-sm">{s.label}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-3 flex-1 md:mt-2">
                        <div className="hidden items-center gap-5 md:flex">
                            <h1 className="flex items-center gap-1.5 text-xl">skniyaznoor <Verified size={18} /></h1>
                            {actions}
                        </div>
                        <ul className="mt-5 hidden gap-10 md:flex">
                            {account.stats.map((s) => (
                                <li key={s.label}>
                                    <span className="font-semibold">{s.value}</span> {s.label}
                                </li>
                            ))}
                        </ul>
                        <div className="md:mt-5">{bio}</div>
                        <div className="mt-4 md:hidden">{actions}</div>
                    </div>
                </header>

                <div className="mt-4 md:mt-10 md:px-8">
                    <div className="md:hidden"><StoryTray ids={highlightIds} size={56} variant="highlights" /></div>
                    <div className="hidden md:block"><StoryTray ids={highlightIds} size={77} variant="highlights" /></div>
                </div>

                <div className="mt-2 flex justify-around border-t border-line md:mt-10 md:justify-center md:gap-14">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            aria-label={t.label}
                            className={`-mt-px flex items-center gap-1.5 border-t py-3 text-xs font-semibold tracking-widest uppercase md:py-4 ${tab === t.id ? "border-fg text-fg" : "border-transparent text-muted"}`}
                        >
                            <t.icon size={22} className="md:h-3 md:w-3" />
                            <span className="hidden md:inline">{t.label}</span>
                        </button>
                    ))}
                </div>

                {tab === "posts" && (
                    <div className="grid grid-cols-3 gap-[3px] md:gap-1">
                        {projects.map((p) => <GridTile key={p.slug} project={p} />)}
                    </div>
                )}

                {tab === "reels" && (
                    <div className="grid grid-cols-3 gap-[3px] md:gap-1">
                        {projects.map((p, i) => (
                            <Link key={p.slug} href={`/reels?i=${i}`} className="group relative block aspect-[9/16] overflow-hidden bg-black">
                                <ScaledBox width={420} height={746}>
                                    <ProjectVisual variant={p.visual} />
                                </ScaledBox>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <span className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-semibold text-white">
                                    <Play size={14} fill="white" /> {p.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}

                {tab === "saved" &&
                    (saves.items.length === 0 ? (
                        <Empty icon={Bookmark} title="Save" body="Tap the bookmark on any post to keep it here. Handy for coming back to a project later." />
                    ) : (
                        <div className="grid grid-cols-3 gap-[3px] md:gap-1">
                            {projects.filter((p) => saves.has(p.slug)).map((p) => <GridTile key={p.slug} project={p} />)}
                        </div>
                    ))}

                {tab === "github" && (
                    <div className="grid gap-3 p-3 sm:grid-cols-2 md:p-0 md:pt-2">
                        {repos.map((r) => (
                            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-line p-4 transition-colors hover:bg-hover">
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <Github size={16} /> {r.name}
                                </div>
                                <p className="mt-2 line-clamp-2 text-sm text-muted">{r.description ?? "No description yet."}</p>
                                <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                                    {r.language && (
                                        <span className="flex items-center gap-1.5">
                                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[r.language] ?? "var(--muted)" }} /> {r.language}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1"><Star size={12} /> {r.stars}</span>
                                    <span className="ml-auto">{new Date(r.pushedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                                </div>
                            </a>
                        ))}
                        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="grid place-items-center rounded-xl border border-dashed border-line p-4 text-sm font-semibold text-accent sm:col-span-2">
                            View all on github.com/skniyaznoor →
                        </a>
                    </div>
                )}

                {tab === "writing" && (
                    <div className="grid grid-cols-3 gap-[3px] md:gap-1">
                        <a href={book.stores[0].url} target="_blank" rel="noopener noreferrer" className="group relative aspect-[3/4] overflow-hidden bg-black">
                            <Image src={book.front} alt={book.title} fill sizes="(max-width:768px) 33vw, 300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            <span className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">NOVEL</span>
                        </a>
                        {writing.map((w, i) => (
                            <a key={w.url} href={w.url} target="_blank" rel="noopener noreferrer" className="relative flex aspect-[3/4] flex-col justify-end p-3 text-white" style={{ background: writingBg[i % writingBg.length] }}>
                                <span className="text-[10px] font-semibold tracking-widest text-white/70 uppercase">{w.type}</span>
                                <span className="mt-1 font-serif text-lg leading-tight italic sm:text-2xl">{w.title}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <Sheet open={links} onClose={() => setLinks(false)}>
                <div className="py-3 text-center text-base font-semibold">Links</div>
                {[
                    ["niyazunveiled.com", profile.links.website],
                    ["github.com/skniyaznoor", profile.links.github],
                    ["LinkedIn", profile.links.linkedin],
                    ["Coffee? on Amazon", book.stores[0].url],
                ].map(([l, h]) => (
                    <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-hover">
                        <Link2 size={18} className="-rotate-45 text-muted" /> {l}
                    </a>
                ))}
            </Sheet>
        </div>
    );
}
