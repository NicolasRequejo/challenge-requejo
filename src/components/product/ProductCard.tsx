"use client";

import Link from "next/link";
import { useState } from "react";
import { Article } from "@/types/article";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  article: Article;
}

export function ProductCard({ article }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [cartButtonState, setCartButtonState] = useState<"idle" | "loading" | "success">("idle");

  const favorite = isFavorite(article.id);

  const handleAddToCart = async () => {
    if (cartButtonState === "loading") return;

    setCartButtonState("loading");
    await new Promise((resolve) => setTimeout(resolve, 500));
    addToCart(article);
    setCartButtonState("success");

    window.setTimeout(() => {
      setCartButtonState("idle");
    }, 1600);
  };

  const cartButtonLabel =
    cartButtonState === "loading"
      ? "Agregando..."
      : cartButtonState === "success"
        ? "Agregado"
        : "Agregar al carrito";

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        <img
          src={article.image}
          alt={article.title}
          className={styles.image}
          onError={(event) => {
            const target = event.currentTarget;
            if (!target.src.endsWith("/images/product-fallback.png")) {
              target.src = "/images/product-fallback.png";
            }
          }}
        />
        <button
          type="button"
          onClick={() => toggleFavorite(article.id)}
          className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ""}`}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{article.category}</span>

        <Link href={`/article/${article.id}`} className={styles.titleLink}>
          {article.title}
        </Link>

        <p className={styles.description}>{article.description}</p>

        <div className={styles.footer}>
          <div>
            <p className={styles.price}>{formatCurrency(article.price)}</p>
            <p className={styles.rating}>Calificación {article.rating.toFixed(1)} de 5</p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.addToCartButton} ${
                cartButtonState === "success" ? styles.addToCartButtonSuccess : ""
              }`}
              onClick={handleAddToCart}
              disabled={cartButtonState === "loading"}
            >
              <span
                className={`${styles.buttonDot} ${
                  cartButtonState === "loading" ? styles.buttonDotLoading : ""
                } ${cartButtonState === "success" ? styles.buttonDotSuccess : ""}`}
                aria-hidden="true"
              />
              {cartButtonLabel}
            </button>

            <Link href={`/article/${article.id}`} className={styles.detailButton}>
              Ver detalle
            </Link>
          </div>
        </div>

        <p className={`${styles.cartFeedback} ${cartButtonState === "success" ? styles.cartFeedbackSuccess : ""}`}>
          {cartButtonState === "loading" && "Agregando producto al carrito..."}
          {cartButtonState === "success" && "Producto agregado correctamente."}
        </p>
      </div>
    </article>
  );
}