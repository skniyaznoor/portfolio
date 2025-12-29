"use client";

import React from 'react';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu, Instagram } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: Compass, label: 'Explore', href: '/explore' },
    { icon: Film, label: 'Reels', href: '/reels' },
    { icon: MessageCircle, label: 'Messages', href: '/messages' },
    { icon: Heart, label: 'Notifications', href: '/notifications' },
    { icon: PlusSquare, label: 'Create', href: '/create' },
    { icon: User, label: 'Profile', href: '/profile' },
];

export default function Navigation() {
    const pathname = usePathname();

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
                            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--hover-overlay)] transition-colors group ${isActive ? 'font-bold' : 'font-normal'
                                }`}
                        >
                            <item.icon className={`w-7 h-7 group-hover:scale-110 transition-transform ${isActive ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                            <span className="hidden xl:block text-lg">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--hover-overlay)] transition-colors w-full">
                    <Menu className="w-7 h-7" />
                    <span className="hidden xl:block text-lg">More</span>
                </button>
            </div>
        </div>
    );
}
