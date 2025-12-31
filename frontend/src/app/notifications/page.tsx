import Navigation from '@/components/layout/Navigation';
import NotificationList from '@/components/notifications/NotificationList';

export default function Page() {
    return (
        <main className="flex min-h-screen bg-[var(--background)]">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20 flex justify-center overflow-y-auto">
                <NotificationList />
            </div>
        </main>
    );
}
