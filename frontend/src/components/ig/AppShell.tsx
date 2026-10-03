"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Bot, Clapperboard, Compass, Download, Github, Heart, Home, Linkedin, Menu, MessageCircle, Moon, PlusSquare, Search, Sun, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Avatar, Wordmark } from "./bits";
import IgProvider, { useIg } from "./IgProvider";
import SearchResults from "./SearchResults";
import { toggleTheme } from "./store";

type NavItem = { id: string; label: string; icon: typeof Home; href?: string; action?: "search" };

const nav: NavItem[] = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "search", label: "Search", icon: Search, action: "search" },
    { id: "explore", label: "Explore", icon: Compass, href: "/explore" },
    { id: "reels", label: "Reels", icon: Clapperboard, href: "/reels" },
    { id: "messages", label: "Messages", icon: MessageCircle, href: "/messages" },
    { id: "notifications", label: "Notifications", icon: Heart, href: "/notifications" },
    { id: "create", label: "Create", icon: PlusSquare, href: "/create" },
];

function MoreMenu({ onClose }: { onClose: () => void }) {
    const { startTour } = useIg();
    const row = "flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-sm hover:bg-hover";
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-16 left-3 z-50 w-[266px] rounded-2xl bg-card p-2 shadow-[0_4px_24px_rgba(0,0,0,0.25)] dark:bg-elevated"
        >
            <button className={row} onClick={() => { toggleTheme(); }}>
                <Sun size={18} className="hidden dark:block" />
                <Moon size={18} className="dark:hidden" />
                Switch appearance
            </button>
            <a className={row} href={profile.resume} download onClick={onClose}>
                <Download size={18} /> Download resume
            </a>
            <button className={row} onClick={() => { onClose(); startTour(); }}>
                <Bot size={18} /> Take the tour
            </button>
            <div className="my-1 h-px bg-line" />
            <a className={row} href={profile.links.github} target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub</a>
            <a className={row} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
            <a className={row} href={profile.links.website} target="_blank" rel="noopener noreferrer"><BookOpen size={18} /> Read my writing</a>
        </motion.div>
    );
}

function Sidebar({ searchOpen, setSearchOpen }: { searchOpen: boolean; setSearchOpen: (v: boolean) => void }) {
    const pathname = usePathname();
    const [more, setMore] = useState(false);
    const moreRef = useRef<HTMLDivElement>(null);
    const compact = searchOpen || pathname.startsWith("/messages");

    useEffect(() => {
        const onDown = (e: MouseEvent) => moreRef.current && !moreRef.current.contains(e.target as Node) && setMore(false);
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    const item = (active: boolean) =>
        `group my-0.5 flex w-full items-center gap-4 rounded-lg p-3 transition-colors hover:bg-hover ${active ? "font-bold" : ""}`;

    return (
        <aside className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-bg px-3 pt-2 pb-5 transition-[width] duration-200 md:flex ${compact ? "w-[72px]" : "w-[72px] xl:w-[244px]"}`}>
            <Link href="/" className="mt-5 mb-6 flex h-10 items-center px-3" aria-label="Home">
                <span className={`hidden ${compact ? "" : "xl:block"}`}>
                    <Wordmark />
                </span>
                <span className={`font-script text-[30px] leading-none ${compact ? "" : "xl:hidden"}`}>N</span>
            </Link>

            <nav className="flex-1" aria-label="Main">
                {nav.map((n) => {
                    const active = n.action === "search" ? searchOpen : !searchOpen && n.href === pathname;
                    const content = (
                        <>
                            <n.icon size={24} strokeWidth={active ? 2.6 : 1.9} className="transition-transform group-hover:scale-105" />
                            <span className={`hidden text-[15px] ${compact ? "" : "xl:inline"}`}>{n.label}</span>
                        </>
                    );
                    if (n.action === "search")
                        return <button key={n.id} data-tour={n.id} onClick={() => setSearchOpen(!searchOpen)} className={item(active)}>{content}</button>;
                    return <Link key={n.id} data-tour={n.id} href={n.href!} onClick={() => setSearchOpen(false)} className={item(active)}>{content}</Link>;
                })}
                <Link data-tour="profile" href="/profile" onClick={() => setSearchOpen(false)} className={item(pathname === "/profile")}>
                    <span className={`rounded-full ${pathname === "/profile" ? "ring-2 ring-fg ring-offset-1 ring-offset-bg" : ""}`}>
                        <Avatar size={24} />
                    </span>
                    <span className={`hidden text-[15px] ${compact ? "" : "xl:inline"}`}>Profile</span>
                </Link>
            </nav>

            <div ref={moreRef} className="relative">
                <AnimatePresence>{more && <MoreMenu onClose={() => setMore(false)} />}</AnimatePresence>
                <button data-tour="more" onClick={() => setMore(!more)} className={item(more)}>
                    <Menu size={24} strokeWidth={more ? 2.6 : 1.9} />
                    <span className={`hidden text-[15px] ${compact ? "" : "xl:inline"}`}>More</span>
                </button>
            </div>
        </aside>
    );
}

function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [q, setQ] = useState("");
    return (
        <AnimatePresence>
            {open && (
                <>
                    <div className="fixed inset-0 z-30 hidden md:block" onClick={onClose} />
                    <motion.div
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ type: "tween", duration: 0.25 }}
                        className="fixed inset-y-0 left-[72px] z-[35] hidden w-[397px] flex-col rounded-r-2xl border-r border-line bg-bg shadow-[4px_0_24px_rgba(0,0,0,0.15)] md:flex"
                    >
                        <h2 className="px-6 pt-6 pb-8 text-2xl font-semibold">Search</h2>
                        <div className="relative mx-4 mb-4">
                            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, skills, stories" className="w-full rounded-lg bg-elevated px-4 py-2.5 text-sm outline-none placeholder:text-muted" />
                            {q && (
                                <button onClick={() => setQ("")} aria-label="Clear" className="absolute top-1/2 right-3 grid h-4 w-4 -translate-y-1/2 place-items-center rounded-full bg-muted text-bg">
                                    <X size={10} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                        <div className="h-px bg-line" />
                        <div className="flex-1 overflow-y-auto">
                            <SearchResults query={q} onNavigate={onClose} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function MobileBars() {
    const pathname = usePathname();
    const onReels = pathname.startsWith("/reels");
    const tab = (active: boolean) => `flex flex-1 items-center justify-center py-3 ${active ? "" : "opacity-90"}`;

    return (
        <>
            {pathname === "/" && (
                <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-line bg-bg px-4 md:hidden">
                    <Wordmark />
                    <div className="flex items-center gap-5">
                        <Link href="/notifications" data-tour="notifications" aria-label="Notifications"><Heart size={24} /></Link>
                        <Link href="/messages" data-tour="messages" aria-label="Messages" className="relative">
                            <MessageCircle size={24} />
                            <span className="absolute -top-1.5 -right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#ff3040] px-1 text-[10px] font-bold text-white">1</span>
                        </Link>
                    </div>
                </header>
            )}
            <nav className={`fixed inset-x-0 bottom-0 z-40 flex h-[50px] items-center border-t md:hidden ${onReels ? "border-white/10 bg-black text-white" : "border-line bg-bg"}`} aria-label="Main">
                <Link href="/" data-tour="home" className={tab(pathname === "/")} aria-label="Home"><Home size={24} strokeWidth={pathname === "/" ? 2.6 : 1.9} /></Link>
                <Link href="/explore" data-tour="explore" className={tab(pathname === "/explore")} aria-label="Explore"><Search size={24} strokeWidth={pathname === "/explore" ? 2.8 : 1.9} /></Link>
                <Link href="/create" data-tour="create" className={tab(pathname === "/create")} aria-label="Create"><PlusSquare size={24} strokeWidth={pathname === "/create" ? 2.6 : 1.9} /></Link>
                <Link href="/reels" data-tour="reels" className={tab(onReels)} aria-label="Reels"><Clapperboard size={24} strokeWidth={onReels ? 2.6 : 1.9} /></Link>
                <Link href="/profile" data-tour="profile" className={tab(pathname === "/profile")} aria-label="Profile">
                    <span className={`rounded-full ${pathname === "/profile" ? "ring-2 ring-fg ring-offset-1 ring-offset-bg" : ""}`}><Avatar size={24} /></span>
                </Link>
            </nav>
        </>
    );
}

export default function AppShell({ children }: { children: ReactNode }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();
    const wide = pathname.startsWith("/messages") ? "xl:pl-[72px]" : "xl:pl-[244px]";
    return (
        <IgProvider>
            <Sidebar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
            <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
            <MobileBars />
            <main className={`min-h-dvh pb-[50px] md:pb-0 md:pl-[72px] ${wide}`}>{children}</main>
        </IgProvider>
    );
}

/** Simple page header used on mobile for inner pages */
export function MobileHeader({ title, right }: { title: ReactNode; right?: ReactNode }) {
    return (
        <header className="sticky top-0 z-30 flex h-[44px] items-center justify-between border-b border-line bg-bg px-4 md:hidden">
            <div className="flex items-center gap-1 text-base font-semibold">{title}</div>
            {right}
        </header>
    );
}
