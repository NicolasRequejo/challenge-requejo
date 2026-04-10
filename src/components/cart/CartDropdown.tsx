"use client";

import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { formatCurrency } from "@/lib/format";
import styles from "./CartDropdown.module.css";

interface CartDropdownProps {
  onClose: () => void;
}

export function CartDropdown({ onClose }: CartDropdownProps) {
  const { cartItems, totalAmount, clearCart } = useCart();

  return (
    <section id="shopping-cart-panel" className={styles.panel} aria-label="Carrito de compras">
      <div className={styles.header}>
        <div>
          <p className={styles.title}>Mi carrito</p>
          <p className={styles.subtitle}>
            {cartItems.length === 0
              ? "Tu carrito está vacío"
              : `${cartItems.length} producto${cartItems.length === 1 ? "" : "s"} en carrito`}
          </p>
        </div>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🛍️</span>
          <p className={styles.emptyTitle}>Tu carrito está vacío</p>
          <p className={styles.emptyText}>
            Descubrí las categorías del sitio y elegí los mejores productos.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {cartItems.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          <div className={styles.footer}>
            <div>
              <p className={styles.totalLabel}>Total</p>
              <p className={styles.totalAmount}>{formatCurrency(totalAmount)}</p>
            </div>
            <div className={styles.footerActions}>
              <button type="button" className={styles.secondaryButton} onClick={clearCart}>
                Vaciar carrito
              </button>
              <button type="button" className={styles.primaryButton}>
                Ir a mi carrito
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
