'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User } from 'lucide-react';

export default function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', icon: Home, label: 'Feed' },
        { href: '/search', icon: Search, label: 'Search' },
        { href: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[var(--ig-primary)] border-t border-[var(--ig-border)] z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-around md:justify-between items-center h-16">
                    {/* Logo - Desktop only */}
                    <div className="hidden md:block">
                        <Link href="/" className="text-2xl font-bold gradient-text">
                            Portfolio
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex justify-around md:justify-end items-center gap-8 w-full md:w-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-all duration-200 ${isActive ? 'text-white' : 'text-[var(--ig-text-secondary)]'
                                        } hover:text-white group`}
                                >
                                    <Icon
                                        size={24}
                                        className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''
                                            } group-hover:scale-110`}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />
                                    <span className="text-xs md:text-sm font-medium">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
