import { experience, education, certifications } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
    return (
        <section id="experience" className="border-t border-line py-24 md:py-32">
            <div className="container-x">
                <SectionHeading
                    index="02"
                    eyebrow="Experience"
                    title={
                        <>
                            Where I&apos;ve <span className="italic">shipped</span>.
                        </>
                    }
                />

                <ol className="relative">
                    {experience.map((job, i) => (
                        <Reveal key={job.company} delay={i * 0.05}>
                            <li className="grid gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr] md:gap-10">
                                <div>
                                    <div className="font-mono text-xs text-accent">{job.period}</div>
                                    <div className="mt-1 text-xs text-muted">{job.location}</div>
                                </div>
                                <div>
                                    <h3 className="font-serif text-3xl leading-tight">{job.company}</h3>
                                    <div className="mt-1 text-sm font-medium text-fg/80">{job.role}</div>
                                    <p className="mt-4 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
                                    {job.points.length > 0 && (
                                        <ul className="mt-5 max-w-2xl space-y-2.5">
                                            {job.points.map((pt) => (
                                                <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                                                    <span className="mt-[0.6em] h-1 w-3 shrink-0 bg-accent" />
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {job.stack.map((s) => (
                                            <span key={s} className="chip">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        </Reveal>
                    ))}
                </ol>

                <Reveal>
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div className="card p-6 sm:p-8">
                            <h3 className="eyebrow mb-5">Education</h3>
                            <ul className="space-y-5">
                                {education.map((e) => (
                                    <li key={e.degree}>
                                        <div className="font-medium">{e.degree}</div>
                                        <div className="mt-0.5 text-sm text-muted">{e.school}</div>
                                        <div className="mt-1 font-mono text-xs text-accent">{e.period}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card p-6 sm:p-8">
                            <h3 className="eyebrow mb-5">Certifications</h3>
                            <ul className="space-y-5">
                                {certifications.map((c) => (
                                    <li key={c.name}>
                                        <div className="font-medium">{c.name}</div>
                                        <div className="mt-0.5 text-sm text-muted">{c.issuer}</div>
                                        <div className="mt-1 font-mono text-xs text-accent">{c.year}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
