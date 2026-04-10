"use client";

import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className={styles.root}>
      <label className="visually-hidden" htmlFor="product-search">
        Buscar producto por nombre
      </label>

      <div className={styles.inputWrap}>
        <input
          id="product-search"
          type="text"
          value={value}
          placeholder="Ingrese un nombre"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
          className={styles.input}
        />

        {hasValue && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => onChange("")}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onSearch}
        className={styles.button}
      >
        Buscar
      </button>
    </div>
  );
}