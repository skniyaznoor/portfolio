"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { book, projects, writing, type Project } from "@/data/portfolio";
import GridTile from "./GridTile";
import SearchResults from "./SearchResults";

const categories = ["All", "AI", "Web", "Games", "Writing", "Freelance", "Open source"] as const;
type Category = (typeof categories)[number];

const projectCats: Record<Project["visual"], Category[]> = {
    ai: ["AI", "Web"],
    game: ["Games"],
    author: ["Web", "Writing", "Open source"],
    docintel: ["AI", "Open source"],
    realestate: ["Freelance", "Web"],
    stream: ["Web"],
    health: ["Web"],
    exam: ["Web"],
    form: ["Open source"],
};

type Tile =
    | { kind: "project"; project: Project; cats: Category[]; text: string }
    | { kind: "book"; cats: Category[]; text: string }
    | { kind: "writing"; title: string; type: string; url: string; cats: Category[]; text: string };

const tiles: Tile[] = [
    ...projects.map((p) => ({ kind: "project" as const, project: p, cats: projectCats[p.visual], text: [p.title, p.tagline, ...p.stack].join(" ") })),
    { kind: "book", cats: ["Writing"], text: "coffee novel book love story" },
    ...writing.map((w) => ({ kind: "writing" as const, ...w, cats: ["Writing" as Category], text: `${w.title} ${w.type}` })),
];
// Interleave writing between projects so the grid mixes content like Instagram's explore page
const ordered = [0, 10, 1, 3, 11, 2, 4, 12, 5, 6, 9, 7, 8, 13, 14, 15].map((i) => tiles[i]).filter(Boolean);

const writingBg = [
    "linear-gradient(160deg,#833ab4,#fd1d1d 60%,#fcb045)",
    "linear-gradient(160deg,#4f5bd5,#962fbf 55%,#d62976)",
    "linear-gradient(160deg,#0b0806,#7a4a26 70%,#e8b07a)",
    "linear-gradient(160deg,#11998e,#38ef7d)",
    "linear-gradient(160deg,#fa7e1e,#d62976)",
    "linear-gradient(160deg,#0f2027,#2c5364 60%,#5aa0c8)",
];

/** Instagram's explore rhythm: blocks of five, with one tall tile alternating sides */
function chunk<T>(arr: T[], n: number) {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
}

function TileView({ tile, i, cls }: { tile: Tile; i: number; cls: string }) {
    // The novel has its own tile here, so show the website shot for the NiyazUnveiled post
    if (tile.kind === "project") return <GridTile project={tile.project} className={cls} image={tile.project.slug === "niyazunveiled" ? 1 : 0} />;
    if (tile.kind === "book")
        return (
            <a href={book.stores[0].url} target="_blank" rel="noopener noreferrer" className={`group relative block overflow-hidden bg-black ${cls}`}>
                <Image src={book.front} alt={book.title} fill sizes="(max-width:768px) 33vw, 310px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">NOVEL · OUT NOW</span>
            </a>
        );
    return (
        <a href={tile.url} target="_blank" rel="noopener noreferrer" className={`relative flex flex-col justify-end p-3 text-white transition-opacity hover:opacity-90 sm:p-4 ${cls}`} style={{ background: writingBg[i % writingBg.length] }}>
            <span className="text-[10px] font-semibold tracking-widest text-white/70 uppercase">{tile.type}</span>
            <span className="mt-1 font-serif text-base leading-tight italic sm:text-2xl">{tile.title}</span>
        </a>
    );
}

export default function ExploreView() {
    const params = useSearchParams();
    const [q, setQ] = useState(params.get("q") ?? "");
    const [focused, setFocused] = useState(false);
    const [cat, setCat] = useState<Category>("All");

    const filtered = useMemo(() => {
        const term = q.toLowerCase().trim();
        return ordered.filter((t) => (cat === "All" || t.cats.includes(cat)) && (!term || t.text.toLowerCase().includes(term)));
    }, [q, cat]);

    const showResults = focused && q.trim().length > 0;

    return (
        <div className="mx-auto max-w-[975px] md:px-5 md:pt-6">
            <div className="sticky top-0 z-20 bg-bg px-4 pt-2 pb-2 md:static md:px-0 md:pt-0">
                <div className="relative">
                    <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setTimeout(() => setFocused(false), 150)}
                        placeholder="Search projects, skills, stories"
                        className="w-full rounded-lg bg-elevated py-2 pr-9 pl-9 text-sm outline-none placeholder:text-muted"
                    />
                    {q && (
                        <button onClick={() => setQ("")} aria-label="Clear" className="absolute top-1/2 right-3 grid h-4 w-4 -translate-y-1/2 place-items-center rounded-full bg-muted text-bg">
                            <X size={10} strokeWidth={3} />
                        </button>
                    )}
                </div>
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
                    {categories.map((c) => (
                        <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${cat === c ? "bg-fg text-bg" : "bg-elevated hover:opacity-80"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {showResults ? (
                <div className="md:hidden">
                    <SearchResults query={q} />
                </div>
            ) : null}

            <div className={showResults ? "hidden md:block" : ""}>
                {filtered.length === 0 ? (
                    <p className="py-20 text-center text-sm text-muted">Nothing matches “{q}”. Try another word or category.</p>
                ) : (
                    <div className="mt-1 space-y-[3px] md:mt-4 md:space-y-1">
                        {chunk(filtered, 5).map((group, gi) =>
                            group.length === 5 ? (
                                <div key={gi} className="grid aspect-[3/2] grid-flow-dense grid-cols-3 grid-rows-2 gap-[3px] md:gap-1">
                                    {group.map((t, i) => {
                                        const tall = gi % 2 === 0 ? i === 2 : i === 0;
                                        const place = tall ? (gi % 2 === 0 ? "col-start-3 row-span-2 row-start-1" : "col-start-1 row-span-2 row-start-1") : "";
                                        return (
                                            <div key={i} className={`min-h-0 ${place}`}>
                                                <TileView tile={t} i={gi * 5 + i} cls="h-full w-full" />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div key={gi} className="grid grid-cols-3 gap-[3px] md:gap-1">
                                    {group.map((t, i) => (
                                        <TileView key={i} tile={t} i={gi * 5 + i} cls="aspect-square w-full" />
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
