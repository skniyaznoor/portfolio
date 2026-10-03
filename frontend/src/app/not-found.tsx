import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center px-6 pt-16 text-center md:pt-24">
            <h1 className="text-2xl font-semibold">Sorry, this page isn&apos;t available.</h1>
            <p className="mt-6 text-base">
                The link you followed may be broken, or the page may have been removed.{" "}
                <Link href="/" className="text-accent">Go back to Niyazion.</Link>
            </p>
        </div>
    );
}
