import Link from "next/link";

import styles from "./not-found.module.css";

export function generateMetadata({ params }) {
  return {
    title: "404",
    description: "Could not find requested resource",
  };
}

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>Not Found</h1>
        </div>
      </header>
      <div className={styles.page}>
        <p>Sorry, but we are not able to find what you are looking for.</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
