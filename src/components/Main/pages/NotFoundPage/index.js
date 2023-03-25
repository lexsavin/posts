import { memo } from "react";
import { NotFound } from "../../components/NotFound";
import styles from "./styles.module.css";

export const NotFoundPage = memo(function NotFoundPage() {
  return (
    <div className={styles.container}>
      <NotFound />
    </div>
  );
});
