"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LoaderCircle, X } from "lucide-react";
import { Avatar } from "./bits";

type Status = "idle" | "sending" | "sent" | "error";

export default function CreateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    const valid = name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.trim();

    const close = () => {
        onClose();
        if (status === "sent") {
            setStatus("idle");
            setName("");
            setEmail("");
            setMessage("");
        }
    };

    async function submit() {
        if (!valid) return;
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message: `[Ask me anything]\n\n${message}` }),
            });
            if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Something went wrong");
            setStatus("sent");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Something went wrong");
            setStatus("error");
        }
    }

    const field = "w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-muted";

    return (
        <AnimatePresence>
            {open && (
                <motion.div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-0 md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
                    <button onClick={close} aria-label="Close" className="absolute top-4 right-4 hidden p-2 text-white md:block">
                        <X size={28} />
                    </button>
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Ask me anything"
                        initial={{ scale: 1.04, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.04, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-dvh w-full flex-col overflow-hidden bg-card md:h-auto md:max-w-[860px] md:rounded-xl"
                    >
                        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                            <button onClick={close} className="text-sm md:invisible" aria-label="Cancel">
                                <X size={22} />
                            </button>
                            <h2 className="text-base font-semibold">{status === "sent" ? "Question shared" : "Ask me anything"}</h2>
                            {status === "sent" ? (
                                <span className="w-10" />
                            ) : (
                                <button onClick={submit} disabled={!valid || status === "sending"} className="text-sm font-semibold text-accent disabled:opacity-40">
                                    {status === "sending" ? <LoaderCircle size={18} className="animate-spin" /> : "Share"}
                                </button>
                            )}
                        </div>

                        {status === "sent" ? (
                            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                                    <div className="ig-ring grid h-24 w-24 place-items-center p-[3px]">
                                        <div className="grid h-full w-full place-items-center rounded-full bg-card">
                                            <CheckCircle2 size={44} className="text-[#d62976]" />
                                        </div>
                                    </div>
                                </motion.div>
                                <p className="text-xl">Your question has been sent.</p>
                                <p className="max-w-xs text-sm text-muted">I&apos;ll reply to {email} soon.</p>
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col overflow-y-auto md:flex-row">
                                <div className="flex items-center justify-center p-6 md:w-1/2" style={{ background: "linear-gradient(150deg,#feda75,#fa7e1e 30%,#d62976 60%,#962fbf 85%,#4f5bd5)" }}>
                                    <div className="aspect-square w-full max-w-[320px] rounded-2xl bg-white/15 p-6 text-white shadow-2xl backdrop-blur-md">
                                        <div className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">Ask me anything</div>
                                        <p className="mt-4 text-xl leading-snug font-bold break-words">{message.trim() || "What would you like to know about my work, my stack or the book?"}</p>
                                        <div className="mt-6 text-sm text-white/80">— {name.trim() || "you"}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 p-5 md:w-1/2">
                                    <div className="flex items-center gap-3">
                                        <Avatar size={28} />
                                        <span className="text-sm font-semibold">to skniyaznoor</span>
                                    </div>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value.slice(0, 2200))}
                                        rows={6}
                                        placeholder="Write your question…"
                                        className="w-full resize-none bg-transparent text-base outline-none placeholder:text-muted"
                                    />
                                    <div className="text-right text-xs text-muted">{message.length}/2,200</div>
                                    <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Your name" autoComplete="name" className={field} />
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} type="email" placeholder="Your email (so I can reply)" autoComplete="email" className={field} />
                                    {status === "error" && <p className="text-sm text-red-500">{error}. Try again, or email skniyaznoor23@gmail.com.</p>}
                                    <button onClick={submit} disabled={!valid || status === "sending"} className="btn-ig mt-1 w-full py-2.5 md:hidden">
                                        {status === "sending" ? "Sharing…" : "Share"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
