"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, Article } from "@/types/article";
import { readStorage, writeStorage } from "@/lib/storage";

interface CartContextValue {
  cartItems: CartItem[];
  distinctCount: number;
  totalUnits: number;
  totalAmount: number;
  addToCart: (article: Article) => void;
  removeFromCart: (articleId: number) => void;
  increaseQuantity: (articleId: number) => void;
  decreaseQuantity: (articleId: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = "challenge-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedItems = readStorage<CartItem[]>(CART_STORAGE_KEY, []);
    setCartItems(storedItems);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(CART_STORAGE_KEY, cartItems);
  }, [cartItems, hydrated]);

  const addToCart = (article: Article) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === article.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === article.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...article, quantity: 1 }];
    });
  };

  const removeFromCart = (articleId: number) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== articleId));
  };

  const increaseQuantity = (articleId: number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === articleId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (articleId: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === articleId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const value = useMemo<CartContextValue>(
    () => ({
      cartItems,
      distinctCount: cartItems.length,
      totalUnits: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      totalAmount: cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
