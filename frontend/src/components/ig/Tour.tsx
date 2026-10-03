"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const allSteps = [
    { target: "home", title: "Home feed", body: "Every project is a post. Swipe the carousel, double-tap to like, or open the full case study." },
    { target: "search", title: "Search", body: "Find projects, skills and stories instantly." },
    { target: "explore", title: "Explore", body: "A grid of everything, filterable by AI, web, games, writing and freelance work." },
    { target: "reels", title: "Reels", body: "Projects in motion: animated, vertical and swipeable." },
    { target: "messages", title: "Messages", body: "DM me. Messages go straight to my inbox." },
    { target: "notifications", title: "Notifications", body: "My career as an activity feed, from the first story in 2020 to the novel." },
    { target: "create", title: "Create", body: "Ask me anything. Your question lands in my email." },
    { target: "profile", title: "Profile", body: "Bio, highlights, saved posts, GitHub repos and the resume download." },
];

function findTarget(id: string) {
    const els = Array.from(document.querySelectorAll<HTMLElement>(`[data-tour="${id}"]`));
    return els.find((el) => el.offsetParent !== null && el.getBoundingClientRect().width > 0) ?? null;
}

export default function Tour({ onClose }: { onClose: () => void }) {
    const steps = useMemo(() => allSteps.filter((s) => typeof document !== "undefined" && findTarget(s.target)), []);
    const [i, setI] = useState(0);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const step = steps[i];

    useEffect(() => {
        if (!step) return;
        const measure = () => {
            const el = findTarget(step.target);
            setRect(el ? el.getBoundingClientRect() : null);
        };
        const raf = requestAnimationFrame(measure);
        window.addEventListener("resize", measure);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", measure);
            document.removeEventListener("keydown", onKey);
        };
    }, [step, onClose]);

    if (!step || !rect) return null;

    const mobile = window.innerWidth < 768;
    const pad = 6;
    const tipStyle: React.CSSProperties = mobile
        ? rect.top > window.innerHeight / 2
            ? { left: 16, right: 16, bottom: window.innerHeight - rect.top + 16 }
            : { left: 16, right: 16, top: rect.bottom + 16 }
        : { left: rect.right + 20, top: Math.max(16, rect.top + rect.height / 2 - 70) };

    return (
        <div className="fixed inset-0 z-[180]" onClick={onClose}>
            <motion.div
                className="pointer-events-none absolute rounded-xl"
                animate={{ left: rect.left - pad, top: rect.top - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.72), 0 0 0 2px #0095f6" }}
            />
            <motion.div
                key={step.target}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute w-auto rounded-2xl bg-card p-5 shadow-2xl md:w-[300px]"
                style={tipStyle}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-1 text-xs font-semibold text-accent">
                    {i + 1} of {steps.length}
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                <div className="mt-4 flex items-center justify-between">
                    <button onClick={onClose} className="text-sm text-muted">Skip tour</button>
                    <div className="flex gap-2">
                        {i > 0 && <button onClick={() => setI(i - 1)} className="btn-ig-muted">Back</button>}
                        <button onClick={() => (i < steps.length - 1 ? setI(i + 1) : onClose())} className="btn-ig">
                            {i < steps.length - 1 ? "Next" : "Done"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
