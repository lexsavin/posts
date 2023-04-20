import styles from "./styles.module.css";
import { memo } from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useFormattingDate } from "../../../../../../hooks/useFormattingDate";

export const Comment = memo(function Comment({ created_at, text, author }) {
  const dateCreationComment = useFormattingDate(created_at);

  return (
    <>
      <div className={styles.horizontalLine}>
        <hr />
      </div>
      <CardHeader
        avatar={
          <Avatar alt={author?.name} src={author?.avatar} aria-label="recipe" />
        }
        title={author?.name}
        subheader={dateCreationComment}
      />
      <div className={styles.text}>{text}</div>
    </>
  );
});
