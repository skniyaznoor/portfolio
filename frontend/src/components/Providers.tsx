"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { BotGuideProvider } from "@/context/BotGuideContext";
import BotGuide from "@/components/layout/BotGuide";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <BotGuideProvider>
                {children}
                <BotGuide />
            </BotGuideProvider>
        </ThemeProvider>
    );
}
