"use client";

import React from 'react';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu, Instagram } from 'lucide-react';
import Link from 'next/link';

const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Search' },
    { icon: Compass, label: 'Explore' },
    { icon: Film, label: 'Reels' },
    { icon: MessageCircle, label: 'Messages' },
    { icon: Heart, label: 'Notifications' },
    { icon: PlusSquare, label: 'Create' },
    { icon: User, label: 'Profile' },
];

export default function Navigation() {
    return (
        <div className="fixed left-0 top-0 h-screen w-20 xl:w-64 border-r border-[#262626] bg-black p-4 flex flex-col transition-all duration-300 z-50">
            <div className="mb-10 px-2">
                <Link href="/" className="flex items-center gap-4">
                    <Instagram className="w-7 h-7 xl:hidden" />
                    <span className="hidden xl:block text-2xl font-bold tracking-tight italic">Portfolio</span>
                </Link>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href="#"
                        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors group ${item.active ? 'font-bold' : 'font-normal'
                            }`}
                    >
                        <item.icon className={`w-7 h-7 group-hover:scale-110 transition-transform ${item.active ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                        <span className="hidden xl:block text-lg">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto">
                <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors w-full">
                    <Menu className="w-7 h-7" />
                    <span className="hidden xl:block text-lg">More</span>
                </button>
            </div>
        </div>
    );
}
