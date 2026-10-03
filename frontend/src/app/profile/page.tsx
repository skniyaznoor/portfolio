import type { Metadata } from "next";
import ProfileView from "@/components/ig/ProfileView";
import { getRepos } from "@/lib/github";

export const revalidate = 86400;
export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
    const repos = await getRepos();
    return <ProfileView repos={repos} />;
}
