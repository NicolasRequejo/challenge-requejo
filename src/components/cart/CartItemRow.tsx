"use client";

import { CartItem } from "@/types/article";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import styles from "./CartItemRow.module.css";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className={styles.row}>
      <img
        src={item.image}
        alt={item.title}
        className={styles.image}
        onError={(event) => {
          event.currentTarget.src = `https://placehold.co/240x240/eef3fb/132238?text=${encodeURIComponent(
            item.title
          )}`;
        }}
      />

      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.price}>{formatCurrency(item.price)}</p>
        </div>

        <div className={styles.actions}>
          <div className={styles.quantityControls}>
            <button type="button" onClick={() => decreaseQuantity(item.id)}>
              −
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => increaseQuantity(item.id)}>
              +
            </button>
          </div>

          <button type="button" className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
