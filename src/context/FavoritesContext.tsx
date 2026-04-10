"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Article } from "@/types/article";
import { readStorage, writeStorage } from "@/lib/storage";

interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (articleId: number) => boolean;
  toggleFavorite: (articleId: number) => void;
  hydrateDefaults: (articles: Article[]) => void;
}

const FAVORITES_STORAGE_KEY = "challenge-favorites";
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedFavorites = readStorage<number[]>(FAVORITES_STORAGE_KEY, []);
    setFavoriteIds(storedFavorites);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(FAVORITES_STORAGE_KEY, favoriteIds);
  }, [favoriteIds, hydrated]);

  const toggleFavorite = (articleId: number) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(articleId)
        ? currentIds.filter((id) => id !== articleId)
        : [...currentIds, articleId]
    );
  };

  const hydrateDefaults = (articles: Article[]) => {
    setFavoriteIds((currentIds) => {
      if (currentIds.length > 0 || !hydrated) return currentIds;
      return articles.filter((article) => article.initialFavorite).map((article) => article.id);
    });
  };

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: (articleId: number) => favoriteIds.includes(articleId),
      toggleFavorite,
      hydrateDefaults,
    }),
    [favoriteIds, hydrated]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
