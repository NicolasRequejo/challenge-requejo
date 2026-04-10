import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <section className={styles.root}>
      <div className={styles.illustration}>🧺</div>
      <span className={styles.queryChip}>{query || "Sin resultados"}</span>
      <h2 className={styles.title}>No se encontraron productos</h2>
      <p className={styles.description}>
        No hay productos que coincidan con tu búsqueda. Intentá ajustar el texto o verificar
        que el nombre que estás buscando sea correcto.
      </p>
    </section>
  );
}
