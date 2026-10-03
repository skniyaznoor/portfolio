"use client";

import { useCallback, useSyncExternalStore } from "react";

/* Small localStorage-backed sets (likes, saves, seen stories) shared across components */

const EMPTY: string[] = [];
const cache = new Map<string, string[]>();
const listeners = new Set<() => void>();

function read(key: string): string[] {
    if (!cache.has(key)) {
        try {
            cache.set(key, JSON.parse(localStorage.getItem(key) || "[]"));
        } catch {
            cache.set(key, []);
        }
    }
    return cache.get(key)!;
}

function write(key: string, value: string[]) {
    cache.set(key, value);
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {}
    listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function usePersistentSet(key: string) {
    const items = useSyncExternalStore(subscribe, () => read(key), () => EMPTY);

    const has = useCallback((id: string) => items.includes(id), [items]);
    const add = useCallback((id: string) => {
        const cur = read(key);
        if (!cur.includes(id)) write(key, [...cur, id]);
    }, [key]);
    const toggle = useCallback((id: string) => {
        const cur = read(key);
        write(key, cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
    }, [key]);

    return { items, has, add, toggle };
}

export const useLikes = () => usePersistentSet("ig-likes");
export const useSaves = () => usePersistentSet("ig-saves");
export const useSeenStories = () => usePersistentSet("ig-seen-stories");
export const useFollow = () => usePersistentSet("ig-follow");

export function toggleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
}
