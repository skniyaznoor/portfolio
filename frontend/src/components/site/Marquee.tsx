const items = ["NestJS", "Next.js", "Claude API", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Socket.IO", "Microsoft Graph", "Three.js", "GLSL", "Firebase", "Laravel", "Docker"];

export default function Marquee() {
    return (
        <div className="relative overflow-hidden border-y border-line py-5" aria-hidden>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
            <div className="animate-marquee flex w-max gap-10">
                {[...items, ...items].map((t, i) => (
                    <span key={i} className="flex items-center gap-10 font-serif text-2xl whitespace-nowrap text-muted italic sm:text-3xl">
                        {t}
                        <span className="text-base text-accent not-italic">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
