import { getArticles } from "@/lib/articles";
import { FavoritesView } from "@/components/favorites/FavoritesView";

export default async function FavoritesPage() {
  const articles = await getArticles();

  return <main> <FavoritesView articles={articles} /></main>
}