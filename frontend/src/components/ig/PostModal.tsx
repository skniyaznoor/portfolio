"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { projects } from "@/data/portfolio";
import PostDetail from "./PostDetail";

export default function PostModal({ slug, onClose }: { slug: string | null; onClose: () => void }) {
    const project = projects.find((p) => p.slug === slug);

    useEffect(() => {
        if (!project) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                    <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 hidden p-2 text-white md:block">
                        <X size={28} />
                    </button>
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-dvh w-full flex-col md:h-[min(92vh,900px)] md:w-auto md:max-w-[calc(100vw-128px)] md:overflow-hidden md:rounded-r-md"
                    >
                        <div className="flex items-center gap-4 border-b border-line bg-bg px-4 py-3 md:hidden">
                            <button onClick={onClose} aria-label="Back">
                                <ArrowLeft size={24} />
                            </button>
                            <span className="font-semibold">Post</span>
                        </div>
                        <div className="min-h-0 flex-1">
                            <PostDetail project={project} variant="modal" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
