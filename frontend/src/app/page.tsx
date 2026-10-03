import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Work from "@/components/site/Work";
import Experience from "@/components/site/Experience";
import Book from "@/components/site/Book";
import GitHub from "@/components/site/GitHub";
import Skills from "@/components/site/Skills";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { getRepos } from "@/lib/github";

export const revalidate = 86400;

export default async function Home() {
    const repos = await getRepos();

    return (
        <>
            <Nav />
            <main>
                <Hero />
                <Marquee />
                <Work />
                <Experience />
                <Book />
                <GitHub repos={repos} />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
