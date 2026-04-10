import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.titleSkeleton} />
        <div className={styles.textSkeleton} />
      </div>

      <section className={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.imageSkeleton} />
            <div className={styles.content}>
              <div className={styles.badgeSkeleton} />
              <div className={styles.lineLg} />
              <div className={styles.lineMd} />
              <div className={styles.lineSm} />
              <div className={styles.footer}>
                <div className={styles.priceBlock}>
                  <div className={styles.lineSm} />
                  <div className={styles.lineXs} />
                </div>
                <div className={styles.actions}>
                  <div className={styles.buttonSkeleton} />
                  <div className={styles.buttonSkeletonLight} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}