import Reveal from "./Reveal";

export default function SectionHeading({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: React.ReactNode; intro?: string }) {
    return (
        <Reveal className="mb-12 md:mb-16">
            <div className="eyebrow mb-4 flex items-center gap-3">
                <span className="text-accent">{index}</span>
                <span className="h-px w-8 bg-line" />
                {eyebrow}
            </div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
            {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
        </Reveal>
    );
}
