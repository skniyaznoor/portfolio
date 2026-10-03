"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RoleCycler({ roles }: { roles: string[] }) {
    const [i, setI] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
        return () => clearInterval(id);
    }, [roles.length]);

    return (
        <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={roles[i]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="whitespace-nowrap text-accent"
                >
                    {roles[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
