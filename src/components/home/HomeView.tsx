"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/states/EmptyState";
import { Article } from "@/types/article";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "./HomeView.module.css";

interface HomeViewProps {
  articles: Article[];
}

export function HomeView({ articles }: HomeViewProps) {
  const [inputValue, setInputValue] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const { hydrateDefaults } = useFavorites();

  useEffect(() => {
    hydrateDefaults(articles);
  }, [articles, hydrateDefaults]);

  useEffect(() => {
  if (inputValue.trim() === "") {
    setAppliedQuery("");
  }
}, [inputValue]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = appliedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return articles;
    }

    return articles.filter((article) =>
      article.title.toLowerCase().includes(normalizedQuery)
    );
  }, [articles, appliedQuery]);

  const handleSearch = () => {
    setAppliedQuery(inputValue);
  };

  return (
    <>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Listado de artículos</span>
          <h1 className={styles.title}>Buscá, marcá favoritos y agregá productos al carrito.</h1>
          <p className={styles.description}>
            La experiencia replica lo pedido en el challenge: listado, detalle, favoritos,
            carrito y búsqueda por título usando datos mockeados.
          </p>
        </div>

        <div className={styles.searchWrap}>
          <SearchBar
            value={inputValue}
            onChange={setInputValue}
            onSearch={handleSearch}
          />
        </div>
      </section>

      <section className={styles.summary}>
        <p className={styles.resultCount}>
          {filteredArticles.length} producto{filteredArticles.length === 1 ? "" : "s"}
        </p>
        <p className={styles.helperText}>
          {appliedQuery ? `Resultados para “${appliedQuery}”` : "Mostrando catálogo completo"}
        </p>
      </section>

      {filteredArticles.length > 0 ? (
        <ProductGrid articles={filteredArticles} />
      ) : (
        <EmptyState query={appliedQuery} />
      )}
    </>
  );
}