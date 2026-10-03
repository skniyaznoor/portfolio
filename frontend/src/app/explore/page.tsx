import { Suspense } from "react";
import type { Metadata } from "next";
import ExploreView from "@/components/ig/ExploreView";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
    return (
        <Suspense>
            <ExploreView />
        </Suspense>
    );
}
