"use client";

import React from 'react';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu, Instagram, Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBotGuide } from '@/context/BotGuideContext';
import { motion } from 'framer-motion';

const navItems = [
    { icon: Home, label: 'Home', href: '/', id: 'nav-home' },
    { icon: Search, label: 'Search', href: '/search', id: 'nav-search' },
    { icon: Compass, label: 'Explore', href: '/explore', id: 'nav-explore' },
    { icon: Film, label: 'Reels', href: '/reels', id: 'nav-reels' },
    { icon: MessageCircle, label: 'Messages', href: '/messages', id: 'nav-messages' },
    { icon: Heart, label: 'Notifications', href: '/notifications', id: 'nav-notifications' },
    { icon: PlusSquare, label: 'Create', href: '/create', id: 'nav-create' },
    { icon: User, label: 'Profile', href: '/profile', id: 'nav-profile' },
];

export default function Navigation() {
    const pathname = usePathname();
    const { startGuide, stopGuide, isActive: isGuideActive } = useBotGuide();
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);
    const moreMenuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setIsMoreOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggleGuide = () => {
        if (isGuideActive) {
            stopGuide();
        } else {
            startGuide();
            setIsMoreOpen(false);
        }
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-20 xl:w-64 border-r border-[var(--border)] bg-[var(--background)] p-4 flex flex-col transition-all duration-300 z-50">
            <div className="mb-10 px-2">
                <Link href="/" className="flex items-center gap-4">
                    <Instagram className="w-7 h-7 xl:hidden" />
                    <span className="hidden xl:block text-2xl font-bold tracking-tight italic">Niyazion</span>
                </Link>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            id={item.id}
                            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--hover-overlay)] transition-colors group ${isActive ? 'font-bold' : 'font-normal'
                                }`}
                        >
                            <item.icon className={`w-7 h-7 group-hover:scale-110 transition-transform ${isActive ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                            <span className="hidden xl:block text-lg">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto relative" ref={moreMenuRef}>
                {/* More Popover */}
                {isMoreOpen && (
                    <div className="absolute bottom-full left-0 mb-4 w-full bg-[var(--card)]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2 animate-fadeIn z-50 overflow-hidden">
                        <div
                            className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer group active:scale-[0.98]"
                            onClick={handleToggleGuide}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl transition-all ${isGuideActive ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30' : 'bg-white/5 text-[var(--foreground)]'}`}>
                                    <Bot size={20} className={isGuideActive ? 'animate-pulse' : ''} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold leading-none mb-1">Bot Guide</span>
                                    <span className="text-[10px] text-[var(--secondary)] font-medium">Interactive Tour</span>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <div
                                className={`w-9 h-5 rounded-full p-1 transition-all duration-300 relative ${isGuideActive ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
                            >
                                <motion.div
                                    animate={{ x: isGuideActive ? 16 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="w-3 h-3 rounded-full bg-white shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    id="more-button"
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--hover-overlay)] transition-colors w-full ${isMoreOpen ? 'bg-[var(--hover-overlay)]' : ''}`}
                >
                    <Menu className="w-7 h-7" />
                    <span className="hidden xl:block text-lg font-medium">More</span>
                </button>
            </div>
        </div>
    );
}
