"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen, RotateCw } from "lucide-react";
import { book, profile, writing } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

export default function Book() {
    const [flipped, setFlipped] = useState(false);

    return (
        // The novel section is always dark: it borrows the palette of the book cover
        <section id="book" data-theme="dark" className="relative overflow-hidden bg-[#0b0806] py-24 text-fg md:py-32">
            <div className="pointer-events-none absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-[#e8b07a]/10 blur-[120px]" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#e8b07a]/5 blur-[100px]" />

            <div className="container-x relative">
                <Reveal className="mb-14">
                    <div className="eyebrow mb-4 flex items-center gap-3">
                        <span className="text-accent">03</span>
                        <span className="h-px w-8 bg-line" />
                        After hours
                    </div>
                    <h2 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                        I also write <span className="text-accent italic">stories</span>.
                    </h2>
                </Reveal>

                <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
                    <Reveal className="mx-auto w-full max-w-[300px] sm:max-w-[340px]">
                        <button
                            onClick={() => setFlipped((f) => !f)}
                            aria-label={flipped ? "Show front cover" : "Show back cover"}
                            className="group relative block w-full [perspective:1600px]"
                        >
                            <div
                                className="relative aspect-[2/3] w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d]"
                                style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(-14deg) rotateX(4deg)" }}
                            >
                                <div className="absolute inset-0 overflow-hidden rounded-r-lg rounded-l-sm shadow-[30px_30px_60px_-20px_rgba(0,0,0,0.9)] [backface-visibility:hidden]">
                                    <Image src={book.front} alt={`${book.title} front cover`} fill sizes="340px" className="object-cover" />
                                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 to-transparent" />
                                </div>
                                <div className="absolute inset-0 overflow-hidden rounded-l-lg rounded-r-sm shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                    <Image src={book.back} alt={`${book.title} back cover`} fill sizes="340px" className="object-cover" />
                                </div>
                            </div>
                            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
                                <RotateCw size={12} /> Tap to flip the cover
                            </span>
                        </button>
                    </Reveal>

                    <div>
                        <Reveal>
                            <div className="eyebrow mb-3">
                                Debut novel · {book.publisher} · {book.year}
                            </div>
                            <h3 className="font-serif text-6xl italic sm:text-7xl md:text-8xl" style={{ color: "#e8c39b" }}>
                                {book.title}
                            </h3>
                            <p className="mt-2 text-lg text-muted">{book.subtitle}</p>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <div className="mt-8 max-w-xl space-y-3 font-serif text-xl leading-relaxed text-fg/85 sm:text-2xl">
                                {book.blurb.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>
                            <p className="mt-6 max-w-xl border-l-2 border-accent pl-4 text-muted italic">{book.hook}</p>
                        </Reveal>

                        <Reveal delay={0.12}>
                            <div className="mt-9">
                                <div className="mb-3 flex items-center gap-2 text-xs text-muted">
                                    Available in
                                    {book.editions.map((e) => (
                                        <span key={e} className="chip">{e}</span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {book.stores.map((s, i) => (
                                        <a
                                            key={s.name}
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn ${i === 0 ? "bg-[#e8b07a] text-black hover:bg-[#f0c294]" : "border border-line hover:border-[#e8b07a]"}`}
                                        >
                                            {s.name} <ArrowUpRight size={14} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <Reveal className="mt-24">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
                        <div className="flex items-start gap-5">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line">
                                <Image src={profile.authorPhoto} alt={`${profile.name}, author portrait`} fill sizes="80px" className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-serif text-2xl">Niyaz Unveiled</h4>
                                <p className="mt-2 leading-relaxed text-muted">
                                    Writing since 2020: short stories, serialised fiction, diary entries and poems about love and the quiet moments in between. 24+ pieces published on a platform I designed and built myself.
                                </p>
                                <a href={profile.links.website} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-flex items-center gap-1.5 text-sm text-accent">
                                    <BookOpen size={14} /> niyazunveiled.com
                                </a>
                            </div>
                        </div>
                        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                            {writing.map((w) => (
                                <li key={w.title}>
                                    <a href={w.url} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center justify-between gap-3 bg-[#0b0806] px-5 py-4 transition-colors hover:bg-[#15100c]">
                                        <span>
                                            <span className="block font-mono text-[10px] tracking-widest text-muted uppercase">{w.type}</span>
                                            <span className="mt-0.5 block font-serif text-lg leading-snug">{w.title}</span>
                                        </span>
                                        <ArrowUpRight size={15} className="shrink-0 text-muted transition-all group-hover:rotate-45 group-hover:text-accent" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
