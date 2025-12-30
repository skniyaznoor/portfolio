import Navigation from '@/components/layout/Navigation';

export default function Page() {
    return (
        <main className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20 flex justify-center">
                <div className="max-w-[935px] w-full px-4 pt-8">
                    <h1 className="text-2xl font-bold">Hello</h1>
                </div>
            </div>
        </main>
    );
}
