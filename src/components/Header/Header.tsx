"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { CartDropdown } from "@/components/cart/CartDropdown";
import styles from "./Header.module.css";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { distinctCount, totalUnits } = useCart();
  const { favoriteIds } = useFavorites();

  const cartLabel = useMemo(
    () => `${distinctCount} producto${distinctCount === 1 ? "" : "s"} distintos`,
    [distinctCount]
  );

  return (
    <header className={styles.header}>
      <div className={styles.brandBlock}>
        <Link href="/" className={styles.brand}>
          Challenge - Requejo
        </Link>
      </div>

      <div className={styles.actions}>

        <Link href="/favorites" className={styles.favoriteLink}>
          Favoritos
          <span className={styles.favoriteBadge}>{favoriteIds.length}</span>
        </Link>
        <div className={styles.counterBlock}>
          <span className={styles.counterLabel}>{cartLabel}</span>
          <span className={styles.counterHint}>{totalUnits} unidades totales</span>
        </div>

        <div className={styles.cartContainer}>
          <button
            type="button"
            className={styles.cartButton}
            onClick={() => setIsCartOpen((current) => !current)}
            aria-expanded={isCartOpen}
            aria-controls="shopping-cart-panel"
          >
            <span aria-hidden="true" className={styles.cartIcon}>🛒</span>
            <span>Mi carrito</span>
            <span className={styles.badge}>{distinctCount}</span>
          </button>

          {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
