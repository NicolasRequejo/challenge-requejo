import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/detail/ProductDetail";
import { getArticleById } from "@/lib/articles";

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const article = await getArticleById(numericId);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <ProductDetail article={article} />
    </main>
  );
}
