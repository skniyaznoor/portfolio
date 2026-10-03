import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile, stats, book } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import RoleCycler from "./RoleCycler";

const status = [
    { key: "building", value: "Claude chat with grounded citations" },
    { key: "shipped", value: "HellBall, a WebGL racer in a sphere" },
    { key: "published", value: `${book.title}, my debut novel` },
];

export default function Hero() {
    return (
        <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
            <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />
            <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

            <div className="container-x">
                <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
                    <div>
                        <Reveal>
                            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-card/60 py-1.5 pr-4 pl-2 text-xs text-muted backdrop-blur">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                Building AI products · Writing novels
                            </div>
                        </Reveal>

                        <Reveal delay={0.05}>
                            <h1 className="font-serif text-[3.4rem] leading-[0.92] tracking-tight sm:text-7xl md:text-8xl">
                                Sk Niyaz
                                <br />
                                <span className="italic">Noor</span>
                                <span className="text-accent">.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <p className="mt-6 font-mono text-sm text-muted sm:text-base">
                                <span className="text-fg">&gt;</span> <RoleCycler roles={profile.roles} />
                            </p>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.pitch}</p>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <a href="#work" className="btn btn-solid">
                                    See my work <ArrowUpRight size={15} />
                                </a>
                                <a href="#contact" className="btn btn-ghost">
                                    <Mail size={15} /> Get in touch
                                </a>
                                <div className="ml-1 flex items-center gap-1">
                                    <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-fg">
                                        <Github size={18} />
                                    </a>
                                    <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-fg">
                                        <Linkedin size={18} />
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.15} className="mx-auto w-full max-w-sm lg:max-w-none">
                        <div className="card relative overflow-hidden p-2 shadow-2xl shadow-black/20">
                            <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
                                <Image src={profile.avatar} alt={profile.name} fill priority sizes="(max-width: 1024px) 384px, 420px" className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white backdrop-blur">
                                    <MapPin size={11} /> {profile.location}
                                </div>
                            </div>
                            <div className="space-y-2.5 p-4 font-mono text-[12px]">
                                <div className="flex items-center gap-1.5 pb-1">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                                    <span className="ml-2 text-muted">~/now</span>
                                </div>
                                {status.map((s) => (
                                    <div key={s.key} className="flex gap-3">
                                        <span className="w-20 shrink-0 text-accent">{s.key}</span>
                                        <span className="text-fg/90">{s.value}</span>
                                    </div>
                                ))}
                                <div className="text-muted">
                                    $ <span className="caret">▍</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.25}>
                    <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-24 md:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-bg p-5 sm:p-7">
                                <dt className="font-serif text-4xl tracking-tight sm:text-5xl">{s.value}</dt>
                                <dd className="mt-2 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}
