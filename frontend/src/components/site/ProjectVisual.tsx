import Image from "next/image";
import type { ProjectVisual as Variant } from "@/data/portfolio";
import { book } from "@/data/portfolio";

/* Hand-built illustrations that stand in for screenshots of each project */

function AiVisual() {
    return (
        <div className="flex h-full flex-col justify-center gap-3 p-5 font-mono text-[11px] sm:p-8 sm:text-xs">
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-fg px-4 py-2.5 text-bg">
                What usage restrictions apply to the @Vendor-A index licence?
            </div>
            <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-bg px-4 py-3 leading-relaxed">
                <span className="text-muted">Redistribution is limited to </span>
                <mark className="rounded bg-accent/25 px-0.5 text-fg">internal use and derived indices</mark>
                <sup className="ml-0.5 rounded bg-accent px-1 text-[9px] text-bg">1</sup>
                <span className="text-muted">; display rights renew quarterly</span>
                <sup className="ml-0.5 rounded bg-accent px-1 text-[9px] text-bg">2</sup>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="chip !py-0.5">§4.2 Licence.pdf</span>
                    <span className="chip !py-0.5">RE: renewal · mail</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] text-muted">
                <span className="rounded-full border border-emerald-500/40 px-2 py-0.5 text-emerald-500">● cache hit · 0.97</span>
                <span className="rounded-full border border-line px-2 py-0.5">grounded · 2 sources</span>
                <span className="rounded-full border border-line px-2 py-0.5">socket · streaming</span>
            </div>
        </div>
    );
}

function GameVisual() {
    return (
        <div className="relative h-full overflow-hidden bg-[#0a0605]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,106,43,0.35),transparent_60%)]" />
            <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                    <radialGradient id="hb-sphere" cx="50%" cy="45%" r="55%">
                        <stop offset="0%" stopColor="#2a1208" />
                        <stop offset="100%" stopColor="#0a0605" />
                    </radialGradient>
                    <linearGradient id="hb-fire" x1="0" x2="1">
                        <stop offset="0%" stopColor="#ffb347" />
                        <stop offset="50%" stopColor="#ff5a1f" />
                        <stop offset="100%" stopColor="#c81d11" />
                    </linearGradient>
                </defs>
                <circle cx="200" cy="135" r="110" fill="url(#hb-sphere)" stroke="#3a2015" />
                {[0, 30, 60, 90, 120, 150].map((r) => (
                    <ellipse key={r} cx="200" cy="135" rx="110" ry="34" fill="none" stroke="#4a2818" strokeWidth="0.8" transform={`rotate(${r} 200 135)`} />
                ))}
                <ellipse cx="200" cy="135" rx="110" ry="40" fill="none" stroke="url(#hb-fire)" strokeWidth="3.5" strokeDasharray="6 5" transform="rotate(-18 200 135)" style={{ animation: "flicker 1.4s infinite" }} />
                <circle cx="300" cy="104" r="5" fill="#fff" />
                <circle cx="300" cy="104" r="12" fill="#ff8a3d" opacity="0.35" />
                <circle cx="118" cy="172" r="4" fill="#ffb347" />
                <circle cx="170" cy="178" r="4" fill="#ff5a1f" />
            </svg>
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-orange-300/80">LAP 3/5 · POS 1</div>
            <div className="absolute right-4 bottom-4 font-mono text-[10px] text-orange-300/80">v²/r &gt; g ✓</div>
            <div className="absolute bottom-4 left-4 h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 bg-gradient-to-r from-amber-300 to-red-500" />
            </div>
        </div>
    );
}

function AuthorVisual() {
    return (
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#0d0907]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(232,176,122,0.28),transparent_60%)]" />
            <div className="relative h-[78%] -rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105" style={{ aspectRatio: "2/3" }}>
                <Image src={book.front} alt={`${book.title} cover`} fill sizes="200px" className="rounded-r-md rounded-l-sm object-cover shadow-2xl shadow-black/60" />
            </div>
            <div className="absolute top-4 right-4 rounded-full border border-amber-200/20 bg-black/40 px-3 py-1 font-mono text-[10px] text-amber-200/90 backdrop-blur">
                25+ stories · Firestore live
            </div>
        </div>
    );
}

function DocVisual() {
    return (
        <div className="flex h-full items-center justify-center gap-3 p-6 sm:gap-5">
            <div className="w-[38%] space-y-1.5 rounded-lg border border-line bg-bg p-3">
                <div className="mb-2 h-2 w-2/3 rounded bg-fg/70" />
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-1 rounded bg-muted/40" style={{ width: `${70 + ((i * 13) % 30)}%` }} />
                ))}
                <div className="pt-1 font-mono text-[9px] text-muted">scan.pdf · OCR</div>
            </div>
            <div className="font-mono text-accent">→</div>
            <div className="w-[42%] rounded-lg border border-accent/40 bg-accent-soft p-3">
                <div className="mb-1.5 font-mono text-[9px] tracking-wider text-accent uppercase">Plain summary</div>
                <p className="text-[11px] leading-snug">You can cancel with 30 days&apos; notice. Late fees apply after the 5th.</p>
                <div className="mt-2 flex flex-wrap gap-1">
                    {["EN", "HI", "OR", "FR"].map((l) => (
                        <span key={l} className="rounded border border-line px-1 font-mono text-[9px] text-muted">{l}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function RealEstateVisual() {
    const towers = [
        { x: 30, w: 50, h: 120 },
        { x: 90, w: 64, h: 170 },
        { x: 164, w: 46, h: 135 },
        { x: 220, w: 70, h: 190 },
        { x: 300, w: 52, h: 110 },
    ];
    return (
        <div className="relative h-full overflow-hidden">
            <svg viewBox="0 0 380 240" className="absolute inset-x-0 bottom-0 h-[88%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
                {towers.map((t, i) => (
                    <g key={i}>
                        <rect x={t.x} y={240 - t.h} width={t.w} height={t.h} fill="var(--card)" stroke="var(--line)" />
                        {Array.from({ length: Math.floor(t.h / 22) }).map((_, r) =>
                            [0, 1, 2].map((c) => (
                                <rect key={`${r}-${c}`} x={t.x + 8 + c * ((t.w - 16) / 3)} y={240 - t.h + 10 + r * 22} width={(t.w - 28) / 3} height="9" fill={(r + c + i) % 4 === 0 ? "var(--accent)" : "var(--line)"} opacity={(r + c + i) % 4 === 0 ? 0.8 : 1} />
                            ))
                        )}
                    </g>
                ))}
            </svg>
            <div className="absolute top-5 left-5 rounded-xl border border-line bg-bg/90 p-3 shadow-lg backdrop-blur">
                <div className="mb-2 font-mono text-[9px] tracking-wider text-muted uppercase">Book a site visit</div>
                <div className="mb-1.5 h-5 w-36 rounded border border-line" />
                <div className="mb-2 flex gap-1.5">
                    <span className="rounded-full bg-fg px-2 text-[9px] text-bg">2 BHK</span>
                    <span className="rounded-full border border-line px-2 text-[9px] text-muted">3 BHK</span>
                </div>
                <div className="h-5 w-36 rounded bg-accent" />
            </div>
        </div>
    );
}

function MiniVisual({ label }: { label: string }) {
    return <div className="grid h-full place-items-center font-serif text-4xl text-muted italic">{label}</div>;
}

export default function ProjectVisual({ variant }: { variant: Variant }) {
    switch (variant) {
        case "ai":
            return <AiVisual />;
        case "game":
            return <GameVisual />;
        case "author":
            return <AuthorVisual />;
        case "docintel":
            return <DocVisual />;
        case "realestate":
            return <RealEstateVisual />;
        default:
            return <MiniVisual label={variant} />;
    }
}
