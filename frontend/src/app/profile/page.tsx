import Navigation from '@/components/layout/Navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileGrid from '@/components/profile/ProfileGrid';

export default function ProfilePage() {
    return (
        <main className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 xl:ml-64 ml-20">
                <div className="w-full py-8">
                    <ProfileHeader />
                    <ProfileGrid />
                </div>
            </div>
        </main>
    );
}
