"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { book, profile, projects, skills, writing } from "@/data/portfolio";
import { Avatar } from "./bits";
import { useIg } from "./IgProvider";
import { usePersistentSet } from "./store";

export const visualEmoji: Record<string, string> = {
    ai: "🤖", game: "🔥", author: "☕", docintel: "📄", realestate: "🏙️", stream: "🎥", health: "🩺", exam: "📝", form: "🧩",
};

interface Result {
    id: string;
    title: string;
    subtitle: string;
    emoji?: string;
    image?: string;
    slug?: string;
    href?: string;
    keywords: string;
}

const index: Result[] = [
    { id: "profile", title: "skniyaznoor", subtitle: `${profile.name} · Full-Stack Engineer & Author`, image: profile.avatar, href: "/profile", keywords: "niyaz noor profile resume about" },
    ...projects.map((p) => ({
        id: p.slug,
        title: p.title,
        subtitle: `${p.kind} · ${p.tagline}`,
        emoji: visualEmoji[p.visual],
        slug: p.slug,
        keywords: [p.title, p.tagline, p.summary, ...p.stack, ...p.highlights].join(" "),
    })),
    { id: "book", title: "Coffee?", subtitle: `Novel · ${book.subtitle}`, image: book.front, href: book.stores[0].url, keywords: "book novel coffee love story author amazon flipkart notion press" },
    ...writing.map((w) => ({ id: w.url, title: w.title, subtitle: `${w.type} · Niyaz Unveiled`, emoji: "✍️", href: w.url, keywords: `${w.title} ${w.type} story poem writing` })),
    ...skills.flatMap((g) => g.items.map((s) => ({ id: `skill-${s}`, title: `#${s.toLowerCase().replace(/[^a-z0-9]/g, "")}`, subtitle: `${g.group} · skill`, emoji: "#", href: `/explore?q=${encodeURIComponent(s)}`, keywords: `${s} ${g.group}` }))),
    { id: "github", title: "GitHub", subtitle: "github.com/skniyaznoor", emoji: "🐙", href: profile.links.github, keywords: "github repos open source code" },
    { id: "resume", title: "Resume", subtitle: "Download PDF", emoji: "📄", href: profile.resume, keywords: "resume cv pdf download hire" },
];

export function search(q: string) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.filter((r) => terms.every((t) => `${r.title} ${r.subtitle} ${r.keywords}`.toLowerCase().includes(t))).slice(0, 20);
}

function Row({ r, onPick, onRemove }: { r: Result; onPick: () => void; onRemove?: () => void }) {
    const { openPost } = useIg();
    const inner = (
        <>
            {r.image ? (
                <Avatar src={r.image} size={44} alt={r.title} />
            ) : (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-elevated text-lg">{r.emoji}</span>
            )}
            <span className="min-w-0 flex-1 text-left">
                <span className="block truncate text-sm font-semibold">{r.title}</span>
                <span className="block truncate text-sm text-muted">{r.subtitle}</span>
            </span>
        </>
    );
    const cls = "flex w-full items-center gap-3 px-6 py-2 hover:bg-hover";
    const external = r.href?.startsWith("http") || r.href?.endsWith(".pdf");
    return (
        <div className="group relative">
            {r.slug ? (
                <button className={cls} onClick={() => { onPick(); openPost(r.slug!); }}>{inner}</button>
            ) : external ? (
                <a className={cls} href={r.href} target="_blank" rel="noopener noreferrer" onClick={onPick}>{inner}</a>
            ) : (
                <Link className={cls} href={r.href!} onClick={onPick}>{inner}</Link>
            )}
            {onRemove && (
                <button onClick={onRemove} aria-label="Remove" className="absolute top-1/2 right-5 -translate-y-1/2 p-1 text-muted">
                    <X size={18} />
                </button>
            )}
        </div>
    );
}

export default function SearchResults({ query, onNavigate }: { query: string; onNavigate?: () => void }) {
    const recent = usePersistentSet("ig-recent-search");
    const results = search(query);

    if (!query.trim()) {
        const items = recent.items.map((id) => index.find((r) => r.id === id)).filter(Boolean) as Result[];
        return (
            <div>
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="font-semibold">Recent</span>
                </div>
                {items.length === 0 ? (
                    <>
                        <p className="px-6 pb-4 text-sm text-muted">No recent searches. Try one of these:</p>
                        {["profile", "ai-data-intelligence-platform", "hellball", "book"].map((id) => {
                            const r = index.find((x) => x.id === id)!;
                            return <Row key={id} r={r} onPick={() => { recent.add(id); onNavigate?.(); }} />;
                        })}
                    </>
                ) : (
                    [...items].reverse().map((r) => <Row key={r.id} r={r} onPick={() => onNavigate?.()} onRemove={() => recent.toggle(r.id)} />)
                )}
            </div>
        );
    }

    return (
        <div className="py-2">
            {results.length === 0 ? (
                <p className="px-6 py-8 text-center text-sm text-muted">No results found.</p>
            ) : (
                results.map((r) => <Row key={r.id} r={r} onPick={() => { recent.add(r.id); onNavigate?.(); }} />)
            )}
        </div>
    );
}
