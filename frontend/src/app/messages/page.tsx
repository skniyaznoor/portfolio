import { Suspense } from "react";
import type { Metadata } from "next";
import MessagesView from "@/components/ig/MessagesView";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
    return (
        <Suspense>
            <MessagesView />
        </Suspense>
    );
}
