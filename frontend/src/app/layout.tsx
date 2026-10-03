import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const description =
  "Sk Niyaz Noor: full-stack engineer building AI products with NestJS, Next.js and Claude, and author of the novel Coffee?.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: `${profile.name} | Full-Stack Engineer & Author`,
  description,
  keywords: ["Sk Niyaz Noor", "Full-Stack Developer", "NestJS", "Next.js", "Claude API", "RAG", "Three.js", "Coffee? novel"],
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    title: `${profile.name} | Full-Stack Engineer & Author`,
    description,
    type: "website",
    images: [{ url: "/images/author.jpg" }],
  },
  twitter: { card: "summary", title: profile.name, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0a09" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
  ],
};

// Runs before hydration so the saved theme is applied without a flash
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('theme')||'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
