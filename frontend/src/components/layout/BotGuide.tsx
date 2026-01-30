"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBotGuide } from '@/context/BotGuideContext';
import { Bot, X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function BotGuide() {
    const { isActive, currentStep, steps, nextStep, prevStep, stopGuide } = useBotGuide();
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const router = useRouter();
    const pathname = usePathname();
    const step = steps[currentStep];

    useEffect(() => {
        if (isActive && step) {
            // Check if we need to navigate
            if (step.path && pathname !== step.path) {
                router.push(step.path);
                return;
            }

            const timer = setTimeout(() => {
                const updateCoords = () => {
                    const element = document.getElementById(step.targetId);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        setCoords({
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height
                        });

                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                };

                updateCoords();
                window.addEventListener('resize', updateCoords);
                window.addEventListener('scroll', updateCoords);

                return () => {
                    window.removeEventListener('resize', updateCoords);
                    window.removeEventListener('scroll', updateCoords);
                };
            }, 100); // Small delay to allow page to render

            return () => clearTimeout(timer);
        }
    }, [isActive, currentStep, step, pathname, router]);

    if (!isActive || !step) return null;

    const getBubblePosition = () => {
        const margin = 20;

        switch (step.position) {
            case 'right':
                return {
                    top: coords.top,
                    left: coords.left + coords.width + margin,
                    x: "0%",
                    y: "0%"
                };
            case 'left':
                return {
                    top: coords.top,
                    left: coords.left - margin,
                    x: "-100%",
                    y: "0%"
                };
            case 'top':
                return {
                    top: coords.top - margin,
                    left: coords.left + coords.width / 2,
                    x: "-50%",
                    y: "-100%"
                };
            case 'bottom':
                return {
                    top: coords.top + coords.height + margin,
                    left: coords.left + coords.width / 2,
                    x: "-50%",
                    y: "0%"
                };
            default:
                return { top: 0, left: 0, x: "0%", y: "0%" };
        }
    };

    const bubblePos = getBubblePosition();

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* Spotlight Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-[2px] pointer-events-auto"
                style={{
                    clipPath: `polygon(
                        0% 0%, 
                        0% 100%, 
                        ${coords.left - 8}px 100%, 
                        ${coords.left - 8}px ${coords.top - 8}px, 
                        ${coords.left + coords.width + 8}px ${coords.top - 8}px, 
                        ${coords.left + coords.width + 8}px ${coords.top + coords.height + 8}px, 
                        ${coords.left - 8}px ${coords.top + coords.height + 8}px, 
                        ${coords.left - 8}px 100%, 
                        100% 100%, 
                        100% 0%
                    )`,
                }}
                onClick={stopGuide}
            />

            {/* Target Highlight Ring */}
            <motion.div
                animate={{
                    top: coords.top - 12,
                    left: coords.left - 12,
                    width: coords.width + 24,
                    height: coords.height + 24,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute border-2 border-[var(--accent)]/50 rounded-xl pointer-events-none"
            >
                <div className="absolute inset-0 rounded-xl shadow-[0_0_30px_rgba(0,149,246,0.3)] animate-pulse" />
            </motion.div>

            {/* Bot & Speech Bubble */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    top: bubblePos.top,
                    left: bubblePos.left,
                    x: bubblePos.x,
                    y: bubblePos.y,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute pointer-events-auto w-[340px]"
            >
                <div className="bg-[var(--card)]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 flex flex-col gap-5 relative overflow-hidden group">
                    {/* Decorative Background Gradient */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent)]/20 blur-[60px] rounded-full group-hover:bg-[var(--accent)]/30 transition-colors duration-500" />

                    <div className="flex items-start justify-between relative z-10">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#4facfe] flex items-center justify-center text-white shadow-lg shadow-[var(--accent)]/20 relative"
                            >
                                <Bot size={28} />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute -top-2 -right-2 text-yellow-400"
                                >
                                    <Sparkles size={16} fill="currentColor" />
                                </motion.div>
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-base tracking-tight leading-none mb-1">{step.title}</h3>
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-12 bg-[var(--border)] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                            className="h-full bg-[var(--accent)]"
                                        />
                                    </div>
                                    <span className="text-[10px] text-[var(--secondary)] font-bold uppercase tracking-tighter">
                                        Step {currentStep + 1} / {steps.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={stopGuide}
                            className="p-2 hover:bg-white/10 rounded-xl transition-all text-[var(--secondary)] hover:text-[var(--foreground)] active:scale-90"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <p className="text-sm leading-relaxed text-[var(--foreground)]/80 font-medium relative z-10">
                        {step.content}
                    </p>

                    <div className="flex items-center gap-3 pt-2 relative z-10">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`p-3 rounded-2xl border border-white/5 bg-white/5 transition-all flex-1 flex justify-center items-center ${currentStep === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/10 active:scale-95'
                                }`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextStep}
                            className="flex items-center justify-center gap-2 py-3 px-6 bg-[var(--accent)] text-white rounded-2xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[var(--accent)]/25 flex-[2]"
                        >
                            {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next Step'}
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Refined Arrow */}
                <div
                    className="absolute w-5 h-5 bg-[var(--card)]/80 backdrop-blur-xl border-l border-t border-white/10 rotate-45 pointer-events-none z-0"
                    style={{
                        ...(step.position === 'right' ? { left: -10, top: coords.height / 2, transform: 'translateY(-50%) rotate(-45deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                        ...(step.position === 'left' ? { right: -10, top: coords.height / 2, transform: 'translateY(-50%) rotate(135deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                        ...(step.position === 'top' ? { bottom: -10, left: '50%', transform: 'translateX(-50%) rotate(225deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                        ...(step.position === 'bottom' ? { top: -10, left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                    }}
                />
            </motion.div>
        </div>
    );
}
