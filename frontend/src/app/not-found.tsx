import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6">
            <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />
            <div className="text-center">
                <div className="eyebrow mb-6">Error 404</div>
                <h1 className="font-serif text-[9rem] leading-none tracking-tighter italic sm:text-[13rem]">
                    4<span className="text-accent">0</span>4
                </h1>
                <p className="mx-auto mt-6 max-w-sm text-lg text-muted">This chapter hasn&apos;t been written yet.</p>
                <Link href="/" className="btn btn-solid mt-10">
                    <ArrowLeft size={15} /> Back to the story
                </Link>
            </div>
        </main>
    );
}
