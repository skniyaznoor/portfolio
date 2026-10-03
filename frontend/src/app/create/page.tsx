import type { Metadata } from "next";
import CreateView from "@/components/ig/CreateView";

export const metadata: Metadata = { title: "Create" };

export default function CreatePage() {
    return <CreateView />;
}
