"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const sections = [
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "book", label: "The Novel" },
    { id: "github", label: "GitHub" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

function toggleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
}

export default function Nav() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => {
            window.removeEventListener("scroll", onScroll);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"}`}
            >
                <div className="container-x flex h-16 items-center justify-between">
                    <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-fg font-serif text-lg italic text-bg transition-transform group-hover:rotate-12">
                            N
                        </span>
                        <span className="text-sm font-medium tracking-tight">{profile.name}</span>
                    </a>

                    <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === s.id ? "text-fg" : "text-muted hover:text-fg"}`}
                            >
                                {active === s.id && (
                                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-line/70" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                                )}
                                {s.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button onClick={toggleTheme} aria-label="Toggle colour theme" className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:border-fg">
                            <Sun size={15} className="hidden dark:block" />
                            <Moon size={15} className="dark:hidden" />
                        </button>
                        <a href={profile.resume} download className="btn btn-solid hidden !px-4 !py-2 sm:inline-flex">
                            <Download size={14} /> Resume
                        </a>
                        <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden">
                            <Menu size={16} />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[70] flex flex-col bg-bg md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="container-x flex h-16 items-center justify-between">
                            <span className="eyebrow">Menu</span>
                            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full border border-line">
                                <X size={16} />
                            </button>
                        </div>
                        <nav className="container-x flex flex-1 flex-col justify-center gap-1" aria-label="Sections">
                            {sections.map((s, i) => (
                                <motion.a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    onClick={() => setOpen(false)}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.04 * i + 0.05 }}
                                    className="flex items-baseline gap-4 border-b border-line py-4 font-serif text-4xl"
                                >
                                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                                    {s.label}
                                </motion.a>
                            ))}
                        </nav>
                        <div className="container-x pb-10">
                            <a href={profile.resume} download className="btn btn-solid w-full !py-3.5">
                                <Download size={15} /> Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
