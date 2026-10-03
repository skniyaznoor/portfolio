"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Info, Mail, PenSquare, Smile } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import { Avatar, Verified } from "./bits";

type Msg = { from: "me" | "you"; text: string; link?: { label: string; href: string } };
type Step = "message" | "name" | "email" | "sending" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const quick = ["I'm hiring 💼", "I have a freelance project 🛠️", "About your book ☕", "Just saying hi 👋"];

export default function MessagesView() {
    const params = useSearchParams();
    const about = projects.find((p) => p.slug === params.get("about"));
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState(params.get("text") ?? "");
    const [step, setStep] = useState<Step>("message");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const notes = useRef<string[]>([]);
    // Full transcript, so the notification email shows the whole conversation
    const log = useRef<string[]>([]);
    const pending = useRef(false);
    const partialSent = useRef(false);
    const who = useRef({ name: "", email: "" });
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        who.current = { name, email };
    }, [name, email]);

    // If the visitor leaves before sharing an email, still deliver what they wrote
    useEffect(() => {
        const flush = () => {
            if (!pending.current || partialSent.current || !notes.current.length) return;
            partialSent.current = true;
            const body = JSON.stringify({
                partial: true,
                source: "messages",
                name: who.current.name,
                email: EMAIL_RE.test(who.current.email) ? who.current.email : "",
                about: about?.title ?? "",
                message: log.current.join("\n"),
            });
            navigator.sendBeacon("/api/contact", new Blob([body], { type: "text/plain" }));
        };
        const onVisibility = () => document.visibilityState === "hidden" && flush();
        window.addEventListener("pagehide", flush);
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            flush();
            window.removeEventListener("pagehide", flush);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [about]);

    const say = (lines: Msg[], delay = 650) =>
        new Promise<void>((resolve) => {
            let i = 0;
            const nextLine = () => {
                if (i >= lines.length) {
                    setTyping(false);
                    resolve();
                    return;
                }
                setTyping(true);
                setTimeout(() => {
                    const line = lines[i++];
                    log.current.push(`Niyaz (auto-reply): ${line.text}`);
                    setMsgs((m) => [...m, line]);
                    nextLine();
                }, delay);
            };
            nextLine();
        });

    useEffect(() => {
        const intro: Msg[] = [
            { from: "you", text: "Hey there 👋 I'm Niyaz." },
            about
                ? { from: "you", text: `I see you're curious about ${about.title}. Ask me anything about it, or anything else.` }
                : { from: "you", text: "Ask me about a role, a freelance project, an AI feature, or my novel Coffee? ☕" },
        ];
        const t = setTimeout(() => say(intro), 300);
        return () => clearTimeout(t);
        // Only run the greeting once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [msgs, typing]);

    async function deliver(n: string, e: string, followUp = false) {
        setStep("sending");
        setTyping(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "messages",
                    name: n,
                    email: e,
                    about: about?.title ?? "",
                    message: followUp ? `Follow-up message:\n\n${notes.current.join("\n\n")}` : log.current.join("\n"),
                }),
            });
            if (!res.ok) throw new Error();
            notes.current = [];
            pending.current = false;
            setTyping(false);
            setStep("done");
            await say([
                { from: "you", text: `Delivered ✓ Thanks, ${n.split(" ")[0]}! I'll reply to ${e} soon.` },
                { from: "you", text: "Meanwhile, grab my resume:", link: { label: "Download resume.pdf", href: profile.resume } },
            ]);
        } catch {
            setTyping(false);
            setStep("message");
            await say([{ from: "you", text: "Hmm, that didn't go through 😕 Please email me directly instead:", link: { label: profile.email, href: `mailto:${profile.email}` } }]);
        }
    }

    async function send(text: string) {
        const t = text.trim();
        if (!t || typing || step === "sending") return;
        setInput("");
        setMsgs((m) => [...m, { from: "me", text: t }]);
        log.current.push(`Visitor: ${t}`);

        if (step === "message" || step === "done") {
            notes.current.push(t);
            pending.current = true;
            if (step === "done" && name && email) {
                await deliver(name, email, true);
                return;
            }
            if (notes.current.length === 1) {
                setStep("name");
                await say([{ from: "you", text: "Love that. So I can get back to you, what's your name?" }]);
            }
        } else if (step === "name") {
            setName(t);
            setStep("email");
            await say([{ from: "you", text: `Nice to meet you, ${t.split(" ")[0]} 🙌 What's the best email to reach you?` }]);
        } else if (step === "email") {
            if (!EMAIL_RE.test(t)) {
                await say([{ from: "you", text: "That doesn't look like an email address. Mind checking it?" }]);
                return;
            }
            setEmail(t);
            await deliver(name, t);
        }
    }

    const placeholder = step === "name" ? "Your name…" : step === "email" ? "you@example.com" : "Message…";

    return (
        <div className="flex h-[calc(100dvh-50px)] md:h-dvh">
            <aside className="hidden w-[100px] shrink-0 flex-col border-r border-line lg:flex xl:w-[397px]">
                <div className="flex items-center justify-between px-6 pt-9 pb-4">
                    <span className="hidden items-center gap-1 text-xl font-bold xl:flex">skniyaznoor <Verified size={14} /></span>
                    <PenSquare size={24} />
                </div>
                <div className="hidden px-6 pb-2 text-base font-bold xl:block">Messages</div>
                <button className="flex items-center gap-3 bg-hover px-6 py-2.5 text-left">
                    <Avatar size={56} ring="story" />
                    <span className="hidden min-w-0 xl:block">
                        <span className="block text-sm">Sk Niyaz Noor</span>
                        <span className="block truncate text-xs text-muted">{msgs.at(-1)?.text ?? "Active now"} · now</span>
                    </span>
                </button>
            </aside>

            <section className="flex min-w-0 flex-1 flex-col">
                <header className="flex items-center gap-3 border-b border-line px-4 py-3 md:py-4">
                    <span className="relative">
                        <Avatar size={44} />
                        <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-bg bg-[#1cd14f]" />
                    </span>
                    <div className="min-w-0 flex-1 leading-tight">
                        <div className="flex items-center gap-1 font-semibold">Sk Niyaz Noor <Verified size={13} /></div>
                        <div className="text-xs text-muted">Active now · usually replies within a day</div>
                    </div>
                    <a href={`mailto:${profile.email}`} aria-label="Email" className="p-2"><Mail size={24} /></a>
                    <Link href="/profile" aria-label="Profile" className="p-2"><Info size={24} /></Link>
                </header>

                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="mb-8 flex flex-col items-center text-center">
                        <Avatar size={96} />
                        <div className="mt-3 flex items-center gap-1 text-xl font-semibold">Sk Niyaz Noor <Verified size={16} /></div>
                        <div className="text-sm text-muted">skniyaznoor · Full-Stack Engineer & Author</div>
                        <Link href="/profile" className="btn-ig-muted mt-4">View profile</Link>
                    </div>

                    <div className="space-y-1.5">
                        {msgs.map((m, i) => {
                            const lastOfRun = msgs[i + 1]?.from !== m.from;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex items-end gap-2 ${m.from === "me" ? "justify-end" : ""}`}>
                                    {m.from === "you" && <span className={lastOfRun ? "" : "invisible"}><Avatar size={28} /></span>}
                                    <div className={`max-w-[75%] rounded-[22px] px-3.5 py-2 text-[15px] leading-snug ${m.from === "me" ? "bg-[#3797f0] text-white" : "bg-elevated"}`}>
                                        {m.text}
                                        {m.link && (
                                            <a href={m.link.href} target={m.link.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" download={m.link.href.endsWith(".pdf") || undefined} className="mt-1.5 block font-semibold text-accent underline-offset-2 hover:underline">
                                                {m.link.label}
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                        {typing && (
                            <div className="flex items-end gap-2">
                                <Avatar size={28} />
                                <div className="flex gap-1 rounded-[22px] bg-elevated px-4 py-3.5">
                                    {[0, 1, 2].map((d) => (
                                        <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 0.15}s` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {step === "message" && msgs.length >= 2 && !msgs.some((m) => m.from === "me") && !typing && (
                        <div className="mt-4 flex flex-wrap justify-end gap-2">
                            {quick.map((q) => (
                                <button key={q} onClick={() => send(q)} className="rounded-full border border-accent px-3.5 py-1.5 text-sm text-accent transition-colors hover:bg-accent hover:text-white">
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={endRef} />
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        send(input);
                    }}
                    className="m-4 mt-0 flex items-center gap-3 rounded-full border border-line px-4 py-2"
                >
                    <Smile size={24} className="shrink-0" />
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholder}
                        type={step === "email" ? "email" : "text"}
                        autoComplete={step === "email" ? "email" : step === "name" ? "name" : "off"}
                        maxLength={step === "message" || step === "done" ? 2000 : 200}
                        className="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] outline-none placeholder:text-muted"
                    />
                    {input.trim() ? (
                        <button className="text-sm font-semibold text-accent">Send</button>
                    ) : (
                        <button type="button" onClick={() => send("❤️")} aria-label="Send a heart">
                            <Heart size={24} />
                        </button>
                    )}
                </form>
            </section>
        </div>
    );
}
