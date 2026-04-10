"use client";

import Link from "next/link";
import { useState } from "react";
import { Article } from "@/types/article";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatCurrency } from "@/lib/format";
import styles from "./ProductDetail.module.css";

interface ProductDetailProps {
  article: Article;
}

export function ProductDetail({ article }: ProductDetailProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "success">("idle");
  const favorite = isFavorite(article.id);

  const handleAddToCart = async () => {
    setButtonState("loading");
    await new Promise((resolve) => setTimeout(resolve, 550));
    addToCart(article);
    setButtonState("success");

    window.setTimeout(() => {
      setButtonState("idle");
    }, 1800);
  };

  const primaryButtonLabel =
    buttonState === "loading"
      ? "Agregando..."
      : buttonState === "success"
        ? "Agregado al carrito"
        : "Agregar al carrito";

  return (
    <section className={styles.wrapper}>
      <div className={styles.breadcrumbs}>
        <Link href="/" className={styles.backLink}>
          ← Volver al listado
        </Link>
      </div>

      <article className={styles.card}>
        <div className={styles.gallery}>
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
        </div>

        <div className={styles.content}>
          <span className={styles.category}>{article.category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.rating}>⭐ {article.rating.toFixed(1)} / 5</p>
          <p className={styles.price}>{formatCurrency(article.price)}</p>
          <p className={styles.description}>{article.description}</p>

          <div className={styles.badges}>
            <span className={styles.badge}>Entrega estimada hoy</span>
            <span className={styles.badge}>Devolución gratuita</span>
            <span className={styles.badge}>Compra segura</span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.primaryButton} ${buttonState === "success" ? styles.primaryButtonSuccess : ""}`}
              onClick={handleAddToCart}
              disabled={buttonState === "loading"}
            >
              <span
                className={`${styles.buttonDot} ${buttonState === "loading" ? styles.buttonDotLoading : ""} ${buttonState === "success" ? styles.buttonDotSuccess : ""}`}
                aria-hidden="true"
              />
              {primaryButtonLabel}
            </button>

            <button
              type="button"
              className={`${styles.secondaryButton} ${favorite ? styles.favoriteActive : ""}`}
              onClick={() => toggleFavorite(article.id)}
            >
              {favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
          </div>

          <p className={`${styles.feedback} ${buttonState === "success" ? styles.feedbackSuccess : ""}`}>
            {buttonState === "loading" && "Estamos agregando el artículo al carrito..."}
            {buttonState === "success" && "Listo. El artículo ya se agregó al carrito."}
          </p>
        </div>
      </article>
    </section>
  );
}