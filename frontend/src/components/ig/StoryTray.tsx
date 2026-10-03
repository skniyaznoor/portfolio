"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stories } from "@/data/instagram";
import { StoryCover } from "./bits";
import { useIg } from "./IgProvider";
import { useSeenStories } from "./store";

/** Horizontal row of story circles. `ids` controls which stories and in what order */
export default function StoryTray({ ids, size = 66, variant = "feed" }: { ids: string[]; size?: number; variant?: "feed" | "highlights" }) {
    const { openStories } = useIg();
    const seen = useSeenStories();
    const ref = useRef<HTMLDivElement>(null);
    const [edges, setEdges] = useState({ left: false, right: true });
    const groups = ids.map((id) => stories.find((s) => s.id === id)!).filter(Boolean);

    const onScroll = () => {
        const el = ref.current;
        if (!el) return;
        setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4 });
    };
    const scrollBy = (dir: number) => ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

    return (
        <div className="relative">
            <div ref={ref} onScroll={onScroll} className="no-scrollbar flex gap-3 overflow-x-auto px-3 py-3 md:gap-4 md:px-1">
                {groups.map((g, i) => {
                    const isSeen = seen.has(g.id);
                    return (
                        <button key={g.id} onClick={() => openStories(ids, i)} className="flex w-[74px] shrink-0 flex-col items-center gap-1.5 md:w-[80px]">
                            {variant === "feed" ? (
                                <span className={isSeen ? "ig-ring-seen" : "ig-ring"} style={{ padding: isSeen ? 1.5 : 2.5 }}>
                                    <span className="block rounded-full bg-bg p-[3px]">
                                        <StoryCover group={g} size={size} />
                                    </span>
                                </span>
                            ) : (
                                <span className="rounded-full border border-line p-[3px]">
                                    <StoryCover group={g} size={size} />
                                </span>
                            )}
                            <span className={`max-w-full truncate text-xs ${variant === "highlights" ? "font-semibold" : isSeen ? "text-muted" : ""}`}>{g.label}</span>
                        </button>
                    );
                })}
            </div>
            {edges.left && (
                <button onClick={() => scrollBy(-1)} aria-label="Scroll left" className="absolute top-[42%] left-2 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow md:grid">
                    <ChevronLeft size={16} />
                </button>
            )}
            {edges.right && groups.length > 6 && (
                <button onClick={() => scrollBy(1)} aria-label="Scroll right" className="absolute top-[42%] right-2 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow md:grid">
                    <ChevronRight size={16} />
                </button>
            )}
        </div>
    );
}
