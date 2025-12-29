"use client";

import React from 'react';
import { X, GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const educationData = [
    {
        period: "2022 - 2024",
        degree: "MASTER DEGREE (MCA)",
        institution: "Silicon Institute of Technology",
        university: "Silicon University",
    },
    {
        period: "2018 - 2021",
        degree: "BACHELOR DEGREE (PHYSICS)",
        institution: "Dharamasala Mahavidyalaya",
        university: "Utkal University",
    },
    {
        period: "2016 - 2018",
        degree: "12th (SCIENCE)",
        institution: "Dharamasala Mahavidyalaya",
        university: "CHSE Board",
    },
    {
        period: "2016",
        degree: "MATRICULATION",
        institution: "Dharamasala Baneepeetha",
        university: "HSCE Board",
    }
];

export default function EducationModal({ isOpen, onClose }: EducationModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[150] flex justify-end"
            onClick={onClose}
        >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

            {/* Modal Content */}
            <div
                className="relative w-full md:w-1/2 h-full bg-[var(--background)] shadow-2xl flex flex-col animate-slide-in-right"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--card)]/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                            <GraduationCap className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">Education Details</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--hover-overlay)] rounded-full transition-colors text-[var(--secondary)] hover:text-[var(--foreground)]"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--border)] before:to-transparent">
                        {educationData.map((edu, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                {/* Icon/Dot */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--accent)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                                    <GraduationCap className="w-5 h-5" />
                                </div>

                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]/30 hover:bg-[var(--card)]/50 transition-all duration-300 shadow-sm hover:shadow-md">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                                            <Calendar className="w-3 h-3" />
                                            {edu.period}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{edu.degree}</h3>
                                    <div className="space-y-1">
                                        <p className="text-[var(--secondary)] font-medium flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {edu.institution}
                                        </p>
                                        <p className="text-[var(--secondary)]/70 text-sm italic ml-6">
                                            {edu.university}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border)] bg-[var(--card)]/20 text-center">
                    <p className="text-sm text-[var(--secondary)]">
                        Continuous learning is the minimum requirement for success in any field.
                    </p>
                </div>
            </div>
        </div>
    );
}
