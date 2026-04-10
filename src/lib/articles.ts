import rawArticles from "@/data/articles.json";
import { Article, RawArticle } from "@/types/article";

const API_DELAY_MS = 350;
const LOCAL_FALLBACK_IMAGE = "/images/product-fallback.png";

const isProblematicImage = (image: string): boolean => {
  const normalized = image.toLowerCase();

  return (
    normalized === "null" ||
    normalized === "undefined" ||
    normalized.includes("example.com") ||
    normalized.includes("ubuy.com.ar/productimg") ||
    normalized.includes("audioimport.com.ar")
  );
};

const getSafeImage = (image?: string): string => {
  const normalized = image?.trim();

  if (!normalized || isProblematicImage(normalized)) {
    return LOCAL_FALLBACK_IMAGE;
  }

  return normalized;
};

const normalizeArticle = (article: RawArticle): Article => ({
  id: article.id,
  title: article.titulo,
  description: article.descripcion,
  price: article.precio,
  image: getSafeImage(article.imagen),
  rating: article.rating,
  category: article.categoria,
  initialFavorite: Boolean(article.fav),
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getArticles(): Promise<Article[]> {
  await wait(API_DELAY_MS);
  return (rawArticles as RawArticle[]).map(normalizeArticle);
}

export async function getArticleById(id: number): Promise<Article | null> {
  await wait(API_DELAY_MS / 2);
  const article = (rawArticles as RawArticle[]).find((item) => item.id === id);
  return article ? normalizeArticle(article) : null;
}