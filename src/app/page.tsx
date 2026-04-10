import { HomeView } from "@/components/home/HomeView";
import { getArticles } from "@/lib/articles";

export default async function HomePage() {
  const articles = await getArticles();
  return <main><HomeView articles={articles} /></main>;
}
