import type { Metadata } from "next";
import ActivityView from "@/components/ig/ActivityView";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
    return <ActivityView />;
}
