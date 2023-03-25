import { memo } from "react";
import styles from "./styles.module.css";

export const Footer = memo(function Footer() {
  return (
    <footer className={styles.footer}>
      Автор проекта: Alexander S. 2023 r.
    </footer>
  );
});
