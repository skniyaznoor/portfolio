"use client";

import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="flex min-h-screen bg-[var(--background)] transition-colors duration-300">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--instagram-gradient)]/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-xl w-full text-center space-y-10 relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <h1 className="text-[10rem] md:text-[15rem] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-[var(--instagram-gradient)] select-none opacity-20 absolute inset-0 blur-xl">
                            404
                        </h1>
                        <h1 className="text-[10rem] md:text-[15rem] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-[var(--instagram-gradient)] select-none relative drop-shadow-2xl">
                            404
                        </h1>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="bg-[var(--card)]/50 backdrop-blur-md border border-[var(--border)] p-8 rounded-3xl shadow-2xl inline-block"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4 flex items-center justify-center gap-3">
                                <AlertCircle className="text-red-500 w-8 h-8" />
                                Page Not Found
                            </h2>
                            <p className="text-[var(--secondary)] text-lg md:text-xl max-w-sm mx-auto leading-relaxed">
                                This page vanished into the digital void. The link might be broken or moved.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/"
                                className="group flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </Link>
                            <Link
                                href="/profile"
                                className="px-8 py-4 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-bold rounded-2xl transition-all hover:bg-[var(--hover-overlay)] hover:scale-105 active:scale-95"
                            >
                                View Profile
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-12"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--border)]/30 rounded-full backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <span className="text-xs font-mono tracking-widest uppercase text-[var(--secondary)]">
                                Error Code: 0x404_VOID
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
