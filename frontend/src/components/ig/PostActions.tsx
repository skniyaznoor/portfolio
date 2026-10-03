"use client";

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useIg } from "./IgProvider";
import { useLikes, useSaves } from "./store";

export function useShare() {
    const { toast } = useIg();
    return async (slug: string, title: string) => {
        const url = `${window.location.origin}/p/${slug}`;
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
                return;
            } catch {
                /* fall through to copying */
            }
        }
        await navigator.clipboard.writeText(url);
        toast("Link copied to clipboard");
    };
}

export default function PostActions({ slug, title, onComment }: { slug: string; title: string; onComment: () => void }) {
    const likes = useLikes();
    const saves = useSaves();
    const share = useShare();
    const { toast } = useIg();
    const liked = likes.has(slug);
    const saved = saves.has(slug);

    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-1">
                <button onClick={() => likes.toggle(slug)} aria-label={liked ? "Unlike" : "Like"} className="p-2 transition-transform active:scale-125 -ml-2">
                    <Heart size={24} className={liked ? "fill-[#ff3040] text-[#ff3040]" : "hover:text-muted"} />
                </button>
                <button onClick={onComment} aria-label="Comment" className="p-2">
                    <MessageCircle size={24} className="-scale-x-100 hover:text-muted" />
                </button>
                <button onClick={() => share(slug, title)} aria-label="Share" className="p-2">
                    <Send size={22} className="hover:text-muted" />
                </button>
            </div>
            <button
                onClick={() => {
                    saves.toggle(slug);
                    toast(saved ? "Removed from saved" : "Saved to your collection");
                }}
                aria-label={saved ? "Unsave" : "Save"}
                className="p-2 -mr-2"
            >
                <Bookmark size={24} className={saved ? "fill-fg" : "hover:text-muted"} />
            </button>
        </div>
    );
}

export function LikeLine({ slug }: { slug: string }) {
    const likes = useLikes();
    return (
        <div className="text-sm font-semibold">
            {likes.has(slug) ? "Liked by you" : <span className="font-normal text-muted">Double-tap to like</span>}
        </div>
    );
}
