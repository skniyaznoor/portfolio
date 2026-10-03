"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Briefcase, CheckCircle2, Coffee, LoaderCircle, MessageCircleQuestion, Rocket } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Avatar, Verified } from "./bits";

type Kind = "ama" | "project" | "hiring" | "book";
type Status = "idle" | "sending" | "sent" | "error";

const kinds: { id: Kind; title: string; body: string; icon: typeof Rocket; bg: string; prompt: string; chips?: { label: string; options: string[] } }[] = [
    { id: "ama", title: "Ask me anything", body: "Code, career, AI, writing. Ask it.", icon: MessageCircleQuestion, bg: "linear-gradient(150deg,#feda75,#fa7e1e 35%,#d62976 70%,#962fbf)", prompt: "What would you like to know?" },
    { id: "project", title: "Project inquiry", body: "Have something to build? Share a brief.", icon: Rocket, bg: "linear-gradient(150deg,#4f5bd5,#962fbf 60%,#d62976)", prompt: "What are you building, and what do you need from me?", chips: { label: "Timeline", options: ["ASAP", "1–3 months", "3+ months", "Just exploring"] } },
    { id: "hiring", title: "I'm hiring", body: "A role on your team? Tell me about it.", icon: Briefcase, bg: "linear-gradient(150deg,#0f2027,#2c5364 55%,#11998e)", prompt: "Tell me about the role and the team.", chips: { label: "Type", options: ["Full-time", "Contract", "Freelance", "Remote"] } },
    { id: "book", title: "Book feedback", body: "Read Coffee? Leave a note for the author.", icon: Coffee, bg: "linear-gradient(150deg,#0b0806,#2b1a10 55%,#7a4a26)", prompt: "What did you think of Coffee?", chips: { label: "Rating", options: ["☕", "☕☕", "☕☕☕", "☕☕☕☕", "☕☕☕☕☕"] } },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CreateView() {
    const [kind, setKind] = useState<Kind | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");
    const [chip, setChip] = useState("");
    const [message, setMessage] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    const k = kinds.find((x) => x.id === kind);
    const valid = !!(name.trim() && EMAIL_RE.test(email) && message.trim());
    const initials = name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "YOU";

    function reset() {
        setKind(null);
        setStatus("idle");
        setMessage("");
        setChip("");
        setOrg("");
    }

    async function share() {
        if (!k || !valid) return;
        setStatus("sending");
        const lines = [`Type: ${k.title}`];
        if (org.trim()) lines.push(`${kind === "hiring" ? "Company" : "Organisation"}: ${org.trim()}`);
        if (chip) lines.push(`${k.chips?.label}: ${chip}`);
        lines.push("", message.trim());
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, source: "create", about: k.title, message: lines.join("\n"), website }),
            });
            if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Something went wrong");
            setStatus("sent");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Something went wrong");
            setStatus("error");
        }
    }

    const field = "w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none transition-colors focus:border-muted";

    return (
        <div className="mx-auto max-w-[900px] px-0 pb-10 md:px-6 md:pt-10">
            <div className="overflow-hidden border-line bg-card md:rounded-xl md:border">
                <header className="flex h-12 items-center justify-between border-b border-line px-4">
                    {kind && status !== "sent" ? (
                        <button onClick={() => setKind(null)} aria-label="Back"><ArrowLeft size={22} /></button>
                    ) : (
                        <Link href="/" aria-label="Back home" className="md:invisible"><ArrowLeft size={22} /></Link>
                    )}
                    <h1 className="text-base font-semibold">{status === "sent" ? "Post shared" : k ? k.title : "Create new post"}</h1>
                    {k && status !== "sent" ? (
                        <button onClick={share} disabled={!valid || status === "sending"} className="text-sm font-semibold text-accent disabled:opacity-40">
                            {status === "sending" ? <LoaderCircle size={18} className="animate-spin" /> : "Share"}
                        </button>
                    ) : (
                        <span className="w-10" />
                    )}
                </header>

                <AnimatePresence mode="wait">
                    {status === "sent" ? (
                        <motion.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center px-6 py-20 text-center">
                            <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="ig-ring grid h-28 w-28 place-items-center p-[3px]">
                                <span className="grid h-full w-full place-items-center rounded-full bg-card">
                                    <CheckCircle2 size={52} strokeWidth={1.5} className="text-[#d62976]" />
                                </span>
                            </motion.div>
                            <p className="mt-6 text-2xl">Your post has been shared.</p>
                            <p className="mt-2 max-w-sm text-sm text-muted">It&apos;s in my inbox now. I&apos;ll reply to {email} soon.</p>
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                <button onClick={reset} className="btn-ig">Create another</button>
                                <a href={profile.resume} download className="btn-ig-muted">Download resume</a>
                                <Link href="/" className="btn-ig-muted">Back to feed</Link>
                            </div>
                        </motion.div>
                    ) : !k ? (
                        <motion.div key="pick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-5 md:p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <Avatar size={44} ring="story" />
                                <div>
                                    <div className="flex items-center gap-1 text-sm font-semibold">to skniyaznoor <Verified size={12} /></div>
                                    <div className="text-sm text-muted">Pick what you want to create. It lands straight in my inbox.</div>
                                </div>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {kinds.map((x, i) => (
                                    <motion.button
                                        key={x.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        onClick={() => setKind(x.id)}
                                        className="group relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-2xl p-5 text-left text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                                        style={{ background: x.bg }}
                                    >
                                        <x.icon size={30} className="absolute top-5 left-5 transition-transform group-hover:scale-110" />
                                        <span className="text-xl font-bold">{x.title}</span>
                                        <span className="mt-1 text-sm text-white/85">{x.body}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="compose" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col md:flex-row">
                            <div className="flex items-center justify-center p-6 md:w-1/2 md:p-8" style={{ background: k.bg }}>
                                <div className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-white text-black shadow-2xl">
                                    <div className="flex items-center gap-2.5 px-3 py-2.5">
                                        <span className="ig-ring p-[2px]">
                                            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#efefef] text-[11px] font-bold">{initials}</span>
                                        </span>
                                        <div className="leading-tight">
                                            <div className="text-[13px] font-semibold">{name.trim() || "you"}</div>
                                            <div className="text-[11px] text-black/50">{org.trim() || k.title}</div>
                                        </div>
                                    </div>
                                    <div className="flex aspect-square flex-col justify-center p-6 text-white" style={{ background: k.bg }}>
                                        <k.icon size={26} className="mb-3 opacity-80" />
                                        <p className="line-clamp-6 text-lg leading-snug font-bold break-words">{message.trim() || k.prompt}</p>
                                        {chip && <span className="mt-4 self-start rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">{k.chips?.label}: {chip}</span>}
                                    </div>
                                    <div className="px-3 py-2.5 text-[13px]">
                                        <span className="font-semibold">{name.trim() || "you"}</span> <span className="text-black/60">tagged</span> <span className="font-semibold">@skniyaznoor</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 p-5 md:w-1/2 md:p-6">
                                <textarea
                                    autoFocus
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value.slice(0, 2200))}
                                    rows={7}
                                    placeholder={k.prompt}
                                    className="w-full resize-none bg-transparent text-base outline-none placeholder:text-muted"
                                />
                                <div className="text-right text-xs text-muted">{message.length}/2,200</div>

                                {k.chips && (
                                    <div>
                                        <div className="mb-2 text-xs font-semibold text-muted">{k.chips.label}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {k.chips.options.map((o) => (
                                                <button key={o} type="button" onClick={() => setChip(chip === o ? "" : o)} className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${chip === o ? "border-accent bg-accent text-white" : "border-line hover:bg-hover"}`}>
                                                    {o}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-2 h-px bg-line" />
                                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Your name" autoComplete="name" className={field} />
                                <input value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} type="email" placeholder="Your email (so I can reply)" autoComplete="email" className={field} />
                                {(kind === "project" || kind === "hiring") && (
                                    <input value={org} onChange={(e) => setOrg(e.target.value)} maxLength={100} placeholder={kind === "hiring" ? "Company" : "Company or project name (optional)"} autoComplete="organization" className={field} />
                                )}
                                {/* Honeypot for bots, hidden from people */}
                                <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                                {status === "error" && <p className="text-sm text-red-500">{error}. Try again, or email {profile.email}.</p>}
                                <button onClick={share} disabled={!valid || status === "sending"} className="btn-ig mt-1 w-full py-2.5">
                                    {status === "sending" ? "Sharing…" : "Share"}
                                </button>
                                <p className="text-center text-xs text-muted">Goes straight to my inbox. I reply personally.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
