import { skills } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Skills() {
    return (
        <section id="skills" className="border-t border-line py-24 md:py-32">
            <div className="container-x">
                <SectionHeading
                    index="05"
                    eyebrow="Toolkit"
                    title={
                        <>
                            The <span className="italic">stack</span> I reach for.
                        </>
                    }
                />
                <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((g, i) => (
                        <Reveal key={g.group} delay={(i % 3) * 0.05} className="bg-bg">
                            <div className="h-full p-6 sm:p-8">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="font-serif text-2xl">{g.group}</h3>
                                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                                </div>
                                <ul className="flex flex-wrap gap-2">
                                    {g.items.map((s) => (
                                        <li key={s} className="rounded-lg border border-line bg-card px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent">
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
