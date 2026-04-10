"use client";

import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>{children}</CartProvider>
    </FavoritesProvider>
  );
}
