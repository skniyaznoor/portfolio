"use client";

import React from 'react';
import Image from 'next/image';
import { Settings, Sun, Moon } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileHeader() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-24 px-4 py-8 max-w-4xl mx-auto">
            {/* Profile Avatar */}
            <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border border-[var(--border)]">
                    <Image
                        src={`/${profile.avatar}`}
                        alt={profile.name}
                        fill
                        sizes="(max-width: 768px) 128px, 160px"
                        priority
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-4 w-full">
                {/* Top Row: Username & Actions */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <h1 className="text-xl md:text-2xl font-normal">{profile.username}</h1>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-1.5 bg-[var(--border)] hover:bg-[var(--secondary)] text-[var(--foreground)] text-sm font-semibold rounded-lg transition-colors">
                            Edit profile
                        </button>
                        <button className="p-2 text-[var(--foreground)] hover:opacity-70">
                            <Settings className="w-6 h-6" />
                        </button>
                        <button onClick={toggleTheme} className="p-2 text-[var(--foreground)] hover:opacity-70">
                            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-center md:justify-start gap-8 md:gap-10 text-base">
                    <div className="flex gap-1">
                        <span className="font-bold">{profile.stats.posts}</span>
                        <span>posts</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="font-bold">{profile.stats.followers}</span>
                        <span>followers</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="font-bold">{profile.stats.following}</span>
                        <span>following</span>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="text-sm md:text-base text-center md:text-left">
                    <div className="font-bold">{profile.name}</div>
                    <div className="text-[var(--secondary)] whitespace-pre-line">
                        {profile.title}
                    </div>
                    <div className="whitespace-pre-line">
                        {profile.bio}
                    </div>

                    <div className="text-[var(--secondary)] mt-2">
                        📍 {profile.addresses.correspondence.addressLine},<br />
                        {profile.addresses.correspondence.city}, {profile.addresses.correspondence.state} – {profile.addresses.correspondence.pin}
                    </div>

                    <div className="text-[var(--secondary)] mt-1">
                        📞 {profile.contact.phones.join(" | ")}
                    </div>
                    <div className="text-[var(--secondary)]">
                        ✉️ {profile.contact.emails[0]}
                    </div>
                </div>
            </div>
        </header>
    );
}
