import HomeFeed from "@/components/ig/HomeFeed";
import { getRepos } from "@/lib/github";

export const revalidate = 86400;

export default async function Home() {
    const repos = await getRepos();
    return <HomeFeed repos={repos} />;
}
