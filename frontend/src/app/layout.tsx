import type { Metadata, Viewport } from "next";
import { Cookie, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/ig/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grand = Cookie({ subsets: ["latin"], weight: "400", variable: "--font-grand" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });

const description = "Sk Niyaz Noor (@skniyaznoor): full-stack engineer building AI products with NestJS, Next.js and Claude, and author of the novel Coffee?.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: { default: "Sk Niyaz Noor (@skniyaznoor) • Niyazion", template: "%s • Niyazion" },
  description,
  keywords: ["Sk Niyaz Noor", "skniyaznoor", "Full-Stack Developer", "NestJS", "Next.js", "Claude API", "Three.js", "Coffee? novel"],
  openGraph: { title: "Sk Niyaz Noor (@skniyaznoor)", description, type: "profile", images: [{ url: "/images/author.jpg" }] },
  twitter: { card: "summary", title: "Sk Niyaz Noor (@skniyaznoor)", description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// Applies the saved theme before hydration so there is no flash
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${grand.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
