import Image from "next/image";
import type { StoryGroup } from "@/data/instagram";
import { account } from "@/data/instagram";
import { profile } from "@/data/portfolio";

export function Verified({ size = 14 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-label="Verified" className="inline-block shrink-0">
            <path fill="#0095f6" d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" />
        </svg>
    );
}

export function Wordmark({ className = "" }: { className?: string }) {
    return <span className={`font-script text-[28px] leading-none ${className}`}>{account.brand}</span>;
}

/** Circular avatar with an optional Instagram-style story ring */
export function Avatar({ src = profile.avatar, size = 32, ring = "none", alt = account.username }: { src?: string; size?: number; ring?: "none" | "story" | "seen"; alt?: string }) {
    const img = (
        <span className="relative inline-block shrink-0 overflow-hidden rounded-full bg-elevated align-middle" style={{ width: size, height: size }}>
            <Image src={src} alt={alt} fill sizes={`${size * 2}px`} className="object-cover" />
        </span>
    );
    if (ring === "none") return img;
    return (
        <span className={`inline-block shrink-0 align-middle leading-[0] ${ring === "story" ? "ig-ring" : "ig-ring-seen"}`} style={{ padding: ring === "story" ? 2 : 1.5 }}>
            <span className="block rounded-full bg-bg p-[2px]">{img}</span>
        </span>
    );
}

/** Cover for a story group: an image or an emoji on a gradient */
export function StoryCover({ group, size }: { group: StoryGroup; size: number }) {
    if ("image" in group.cover) {
        return (
            <span className="relative block overflow-hidden rounded-full bg-elevated" style={{ width: size, height: size }}>
                <Image src={group.cover.image} alt={group.label} fill sizes={`${size * 2}px`} className="object-cover" />
            </span>
        );
    }
    return (
        <span className="grid place-items-center rounded-full" style={{ width: size, height: size, background: group.cover.bg, fontSize: size * 0.42 }}>
            {group.cover.emoji}
        </span>
    );
}
