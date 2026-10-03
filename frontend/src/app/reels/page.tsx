import { Suspense } from "react";
import type { Metadata } from "next";
import ReelsView from "@/components/ig/ReelsView";

export const metadata: Metadata = { title: "Reels" };

export default function ReelsPage() {
    return (
        <Suspense>
            <ReelsView />
        </Suspense>
    );
}
