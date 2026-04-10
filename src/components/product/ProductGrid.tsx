import { Article } from "@/types/article";
import { ProductCard } from "@/components/product/ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  articles: Article[];
}

export function ProductGrid({ articles }: ProductGridProps) {
  return (
    <section className={styles.grid}>
      {articles.map((article) => (
        <ProductCard key={article.id} article={article} />
      ))}
    </section>
  );
}
