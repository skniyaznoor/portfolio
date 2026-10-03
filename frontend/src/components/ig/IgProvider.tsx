"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StoryViewer from "./StoryViewer";
import PostModal from "./PostModal";
import Tour from "./Tour";

interface IgContext {
    openStories: (ids: string[], start: number) => void;
    openPost: (slug: string) => void;
    startTour: () => void;
    toast: (msg: string) => void;
}

const Ctx = createContext<IgContext | null>(null);

export function useIg() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useIg must be used inside IgProvider");
    return ctx;
}

export default function IgProvider({ children }: { children: ReactNode }) {
    const [stories, setStories] = useState<{ ids: string[]; start: number } | null>(null);
    const [post, setPost] = useState<string | null>(null);
    const [tour, setTour] = useState(false);
    const [toastMsg, setToastMsg] = useState<string | null>(null);

    const toast = useCallback((msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 2200);
    }, []);

    const value = useMemo<IgContext>(
        () => ({
            openStories: (ids, start) => setStories({ ids, start }),
            openPost: setPost,
            startTour: () => setTour(true),
            toast,
        }),
        [toast]
    );

    return (
        <Ctx.Provider value={value}>
            {children}
            {stories && <StoryViewer ids={stories.ids} start={stories.start} onClose={() => setStories(null)} />}
            <PostModal slug={post} onClose={() => setPost(null)} />
            {tour && <Tour onClose={() => setTour(false)} />}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-20 left-1/2 z-[200] -translate-x-1/2 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg shadow-xl md:bottom-8"
                    >
                        {toastMsg}
                    </motion.div>
                )}
            </AnimatePresence>
        </Ctx.Provider>
    );
}
