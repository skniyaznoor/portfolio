"use client";

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface StoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    quote?: string;
}

export default function StoryModal({ isOpen, onClose, quote = "The only way to do great work is to love what you do." }: StoryModalProps) {
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const progressTimer = setTimeout(() => setProgress(100), 100);
            const closeTimer = setTimeout(onClose, 15000);

            return () => {
                document.body.style.overflow = 'unset';
                clearTimeout(progressTimer);
                clearTimeout(closeTimer);
                setProgress(0);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
                <div
                    className="h-full bg-white ease-linear"
                    style={{
                        width: `${progress}%`,
                        transitionDuration: '15s',
                        transitionProperty: 'width'
                    }}
                />
            </div>

            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity z-10"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="max-w-2xl text-center animate-in fade-in zoom-in duration-300">
                <div className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed">
                    "{quote}"
                </div>
                <div className="mt-6 w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
            </div>
        </div>
    );
}
