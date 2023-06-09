import { memo } from "react";
import { Sort } from "./components/Sort";
import styles from "./styles.module.css";
import { ModalFormCreatePost } from "./components/ModalFormCreatePost";

export const ContentHeader = memo(function ContentHeader() {
  return (
    <div className={styles.container}>
      <Sort />
      <h1 className={styles.header}>Добро пожаловать на мою страничку</h1>
      <div className={styles.group}>
        <div>Здесь вы можете реактивно развлекаться</div>
        <ModalFormCreatePost />
      </div>
    </div>
  );
});
