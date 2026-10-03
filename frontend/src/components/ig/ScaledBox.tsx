"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Renders children at a fixed design size and scales them to fill the box (for small grid tiles) */
export default function ScaledBox({ width, height, children }: { width: number; height: number; children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width: w, height: h } = entry.contentRect;
            setScale(Math.max(w / width, h / height));
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [width, height]);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden">
            <div
                className="absolute top-1/2 left-1/2 origin-center"
                style={{ width, height, transform: `translate(-50%, -50%) scale(${scale})`, opacity: scale ? 1 : 0 }}
            >
                {children}
            </div>
        </div>
    );
}
