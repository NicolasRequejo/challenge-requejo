"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useFavorites } from "@/context/FavoritesContext";
import { Article } from "@/types/article";
import styles from "./FavoritesView.module.css";

interface FavoritesViewProps {
  articles: Article[];
}

export function FavoritesView({ articles }: FavoritesViewProps) {
  const { favoriteIds } = useFavorites();
  const favoriteArticles = articles.filter((article) => favoriteIds.includes(article.id));

  return (
    <>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Favoritos</span>
          <h1 className={styles.title}>Tus productos guardados</h1>
          <p className={styles.description}>
            Acá podés revisar rápidamente tus artículos favoritos.
          </p>
        </div>

        <Link href="/" className={styles.backLink}>
          ← Volver al catálogo
        </Link>
      </section>

      <section className={styles.summary}>
        <p className={styles.resultCount}>
          {favoriteArticles.length} favorito{favoriteArticles.length === 1 ? "" : "s"}
        </p>
      </section>

      {favoriteArticles.length > 0 ? (
        <ProductGrid articles={favoriteArticles} />
      ) : (
        <section className={styles.emptyState}>
          <h2>No tenés favoritos guardados</h2>
          <p>Marcá artículos desde el catálogo o desde el detalle del producto para verlos acá.</p>
          <Link href="/" className={styles.primaryLink}>
            Explorar productos
          </Link>
        </section>
      )}
    </>
  );
}