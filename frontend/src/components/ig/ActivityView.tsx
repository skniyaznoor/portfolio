"use client";

import Image from "next/image";
import Link from "next/link";
import { activity, type Activity } from "@/data/instagram";
import { projects } from "@/data/portfolio";
import { Avatar } from "./bits";
import { MobileHeader } from "./AppShell";
import { useIg } from "./IgProvider";

const groups: Activity["group"][] = ["This year", "2025", "Earlier"];

function Row({ a }: { a: Activity }) {
    const { openPost } = useIg();
    const project = a.slug ? projects.find((p) => p.slug === a.slug) : undefined;

    const thumb = project ? (
        <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-md bg-card">
            <Image src={project.images[0]} alt="" fill sizes="88px" className="object-cover" />
        </span>
    ) : a.thumb ? (
        <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-md bg-card">
            <Image src={a.thumb} alt="" fill sizes="88px" className="object-cover" />
        </span>
    ) : null;

    const body = (
        <>
            <Avatar size={44} />
            <p className="min-w-0 flex-1 text-sm leading-snug">
                <span className="font-semibold">skniyaznoor</span> {a.text} <span className="text-muted">{a.when}</span>
            </p>
            {thumb}
        </>
    );
    const cls = "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-hover md:px-6";

    if (project) return <button className={cls} onClick={() => openPost(project.slug)}>{body}</button>;
    if (a.href) return <a className={cls} href={a.href} target="_blank" rel="noopener noreferrer">{body}</a>;
    return <div className={cls}>{body}</div>;
}

export default function ActivityView() {
    return (
        <div>
            <MobileHeader title="Notifications" />
            <div className="mx-auto max-w-[600px] md:pt-8">
                <h1 className="hidden px-6 pb-4 text-2xl font-bold md:block">Notifications</h1>
                <Link href="/messages" className="mx-4 mt-3 mb-2 flex items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:bg-hover md:mx-6">
                    <span className="ig-ring grid h-11 w-11 shrink-0 place-items-center p-[2px]">
                        <span className="grid h-full w-full place-items-center rounded-full bg-bg text-lg">💬</span>
                    </span>
                    <span className="flex-1 text-sm">
                        <span className="font-semibold">Want to work together?</span>
                        <span className="block text-muted">Send me a message and it lands in my inbox.</span>
                    </span>
                    <span className="btn-ig">Message</span>
                </Link>
                {groups.map((g) => (
                    <section key={g} className="border-b border-line py-3 last:border-0">
                        <h2 className="px-4 pb-1 text-base font-bold md:px-6">{g}</h2>
                        {activity.filter((a) => a.group === g).map((a) => <Row key={a.text} a={a} />)}
                    </section>
                ))}
            </div>
        </div>
    );
}
