import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
      }}
    >
      <section
        style={{
          maxWidth: "580px",
          textAlign: "center",
          background: "white",
          padding: "40px 28px",
          borderRadius: "24px",
          border: "1px solid #d7deea",
          boxShadow: "0 18px 48px rgba(19, 34, 56, 0.08)",
        }}
      >
        <p style={{ margin: 0, color: "#66758d", fontWeight: 700 }}>404</p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "2rem" }}>Producto no encontrado</h1>
        <p style={{ margin: 0, color: "#66758d", lineHeight: 1.6 }}>
          El artículo que intentaste abrir no existe o la URL no es válida.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            marginTop: "20px",
            minHeight: "46px",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 18px",
            borderRadius: "999px",
            background: "#1b66ff",
            color: "white",
            fontWeight: 700,
          }}
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
