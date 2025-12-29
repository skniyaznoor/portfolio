import Navigation from '@/components/layout/Navigation';

export default function Page() {
    return (
        <main className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20 flex items-center justify-center">
                <h1 className="text-2xl font-bold">Hello</h1>
            </div>
        </main>
    );
}
