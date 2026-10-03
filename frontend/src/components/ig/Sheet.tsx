"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

/** Instagram-style options sheet: centred dialog on desktop, bottom sheet on mobile */
export default function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div className="fixed inset-0 z-[160] flex items-end justify-center bg-black/65 md:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                    <motion.div
                        initial={{ y: 40, scale: 0.98 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 40 }}
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="w-full divide-y divide-line overflow-hidden rounded-t-2xl bg-card md:max-w-[400px] md:rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                        <button onClick={onClose} className="block w-full py-3.5 text-center text-sm">Cancel</button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
