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
                    top: coords.top + coords.height / 2,
                    left: coords.left + coords.width + margin,
                    translateY: '-50%'
                };
            case 'left':
                return {
                    top: coords.top + coords.height / 2,
                    left: coords.left - margin,
                    translateX: '-100%',
                    translateY: '-50%'
                };
            case 'top':
                return {
                    top: coords.top - margin,
                    left: coords.left + coords.width / 2,
                    translateX: '-50%',
                    translateY: '-100%'
                };
            case 'bottom':
                return {
                    top: coords.top + coords.height + margin,
                    left: coords.left + coords.width / 2,
                    translateX: '-50%'
                };
            default:
                return { top: 0, left: 0 };
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
                className="absolute inset-0 bg-black/60 pointer-events-auto"
                style={{
                    clipPath: `polygon(0% 0%, 0% 100%, ${coords.left}px 100%, ${coords.left}px ${coords.top}px, ${coords.left + coords.width}px ${coords.top}px, ${coords.left + coords.width}px ${coords.top + coords.height}px, ${coords.left}px ${coords.top + coords.height}px, ${coords.left}px 100%, 100% 100%, 100% 0%)`
                }}
                onClick={stopGuide}
            />

            {/* Target Highlight */}
            <motion.div
                animate={{
                    top: coords.top - 4,
                    left: coords.left - 4,
                    width: coords.width + 8,
                    height: coords.height + 8,
                }}
                className="absolute border-2 border-[var(--accent)] rounded-lg shadow-[0_0_15px_rgba(0,149,246,0.5)] pointer-events-none"
            />

            {/* Bot & Speech Bubble */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    top: bubblePos.top,
                    left: bubblePos.left,
                }}
                style={{
                    x: bubblePos.translateX || 0,
                    y: bubblePos.translateY || 0,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute pointer-events-auto w-80"
            >
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 relative overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--accent)]/10 blur-3xl rounded-full" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] relative">
                                <Bot size={24} />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute -top-1 -right-1"
                                >
                                    <Sparkles size={12} className="text-yellow-400" />
                                </motion.div>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-tight">{step.title}</h3>
                                <p className="text-[10px] text-[var(--secondary)] uppercase tracking-widest font-bold">Step {currentStep + 1} of {steps.length}</p>
                            </div>
                        </div>
                        <button
                            onClick={stopGuide}
                            className="p-1 hover:bg-[var(--hover-overlay)] rounded-full transition-colors text-[var(--secondary)]"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <p className="text-sm leading-relaxed text-[var(--foreground)]/90">
                        {step.content}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                        <div className="flex gap-1">
                            {steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 w-4 rounded-full transition-all ${i === currentStep ? 'bg-[var(--accent)] w-8' : 'bg-[var(--border)]'}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`p-2 rounded-lg border border-[var(--border)] transition-all ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--hover-overlay)] active:scale-95'}`}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[var(--accent)]/20"
                            >
                                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <div
                    className={`absolute w-4 h-4 bg-[var(--card)] border-l border-t border-[var(--border)] rotate-45 pointer-events-none`}
                    style={{
                        ...(step.position === 'right' ? { left: -8, top: '50%', transform: 'translateY(-50%) rotate(-45deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                        ...(step.position === 'left' ? { right: -8, top: '50%', transform: 'translateY(-50%) rotate(135deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                        ...(step.position === 'top' ? { bottom: -8, left: '50%', transform: 'translateX(-50%) rotate(225deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                        ...(step.position === 'bottom' ? { top: -8, left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderRight: 'none', borderBottom: 'none' } : {}),
                    }}
                />
            </motion.div>
        </div>
    );
}
