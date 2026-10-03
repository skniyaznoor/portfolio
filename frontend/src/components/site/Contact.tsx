"use client";

import { useState } from "react";
import { Check, Copy, Github, Instagram, Linkedin, LoaderCircle, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const field =
    "w-full rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-fg";

export default function Contact() {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const body = Object.fromEntries(new FormData(form));
        setStatus("sending");
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Something went wrong");
            }
            form.reset();
            setStatus("sent");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setStatus("error");
        }
    }

    async function copyEmail() {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    }

    const socials = [
        { icon: Github, label: "GitHub", href: profile.links.github },
        { icon: Linkedin, label: "LinkedIn", href: profile.links.linkedin },
        { icon: Instagram, label: "Instagram", href: profile.links.instagram },
    ];

    return (
        <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-32">
            <div className="pointer-events-none absolute -right-40 -bottom-40 -z-10 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
            <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
                <Reveal>
                    <div className="eyebrow mb-4 flex items-center gap-3">
                        <span className="text-accent">06</span>
                        <span className="h-px w-8 bg-line" />
                        Contact
                    </div>
                    <h2 className="font-serif text-5xl leading-[1] tracking-tight sm:text-6xl md:text-7xl">
                        Let&apos;s build
                        <br />
                        <span className="italic">something</span>
                        <span className="text-accent">.</span>
                    </h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                        A role, a freelance project, an AI feature that needs to actually work in production, or just a note about the book. My inbox is open.
                    </p>

                    <button onClick={copyEmail} className="group mt-10 flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border border-line bg-card px-5 py-4 text-left transition-colors hover:border-fg">
                        <span className="min-w-0">
                            <span className="eyebrow block">Email</span>
                            <span className="mt-1 block truncate text-base sm:text-lg">{profile.email}</span>
                        </span>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line">
                            {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                        </span>
                    </button>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {socials.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                <s.icon size={15} /> {s.label}
                            </a>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block">
                                <span className="mb-2 block text-sm text-muted">Name</span>
                                <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
                            </label>
                            <label className="block">
                                <span className="mb-2 block text-sm text-muted">Email</span>
                                <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" className={field} />
                            </label>
                        </div>
                        <label className="block">
                            <span className="mb-2 block text-sm text-muted">Message</span>
                            <textarea name="message" required maxLength={5000} rows={6} placeholder="Tell me about the project or role…" className={`${field} resize-none`} />
                        </label>

                        <button type="submit" disabled={status === "sending"} className="btn btn-solid w-full !py-3.5 disabled:opacity-60">
                            {status === "sending" ? (
                                <>
                                    <LoaderCircle size={16} className="animate-spin" /> Sending…
                                </>
                            ) : status === "sent" ? (
                                <>
                                    <Check size={16} /> Message sent. I&apos;ll reply soon.
                                </>
                            ) : (
                                <>
                                    <Send size={15} /> Send message
                                </>
                            )}
                        </button>
                        {status === "error" && <p className="text-center text-sm text-red-500">{error}. You can also email me directly.</p>}
                    </form>
                </Reveal>
            </div>
        </section>
    );
}
