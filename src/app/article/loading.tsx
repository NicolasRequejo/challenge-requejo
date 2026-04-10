import styles from "./loading.module.css";

export default function ArticleDetailLoading() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb} />

      <section className={styles.card}>
        <div className={styles.imageSkeleton} />

        <div className={styles.content}>
          <div className={styles.categorySkeleton} />
          <div className={styles.titleSkeleton} />
          <div className={styles.ratingSkeleton} />
          <div className={styles.priceSkeleton} />
          <div className={styles.textLine} />
          <div className={styles.textLine} />
          <div className={styles.textLineShort} />

          <div className={styles.badges}>
            <div className={styles.badgeSkeleton} />
            <div className={styles.badgeSkeleton} />
            <div className={styles.badgeSkeleton} />
          </div>

          <div className={styles.actions}>
            <div className={styles.buttonPrimary} />
            <div className={styles.buttonSecondary} />
          </div>
        </div>
      </section>
    </main>
  );
}