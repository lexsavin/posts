import styles from "./styles.module.css";
import { useCallback, useContext, memo } from "react";
import { api } from "../../../../../../utils/api";
import { useApi } from "../../../../../../hooks/useApi";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useFormattingDate } from "../../../../../../hooks/useFormattingDate";
import { UserContext } from "../../../../../../context/user-context";

export const Comment = memo(function Comment({
  created_at,
  text,
  author: authorId,
}) {
  const { token } = useContext(UserContext);
  const dateCreationComment = useFormattingDate(created_at);

  const handleGetInfoUserById = useCallback(
    () => api.getInfoUserById(authorId, token),
    [authorId, token]
  );

  const { data: infoUser } = useApi(handleGetInfoUserById);

  return (
    <>
      <div className={styles.horizontalLine}>
        <hr />
      </div>
      <CardHeader
        avatar={
          <Avatar
            alt={infoUser?.name}
            src={infoUser?.avatar}
            aria-label="recipe"
          />
        }
        title={infoUser?.name}
        subheader={dateCreationComment}
      />
      <div className={styles.text}>{text}</div>
    </>
  );
});
