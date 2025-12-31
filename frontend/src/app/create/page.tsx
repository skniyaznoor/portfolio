"use client";

import Navigation from '@/components/layout/Navigation';
import AMAForm from '@/components/create/AMAForm';

export default function CreatePage() {
    return (
        <main className="flex min-h-screen overflow-hidden relative">
            <Navigation />

            <div className="flex-1 xl:ml-64 ml-20 flex flex-col items-center justify-center p-6 relative z-10">
                <AMAForm />
            </div>
        </main>
    );
}
