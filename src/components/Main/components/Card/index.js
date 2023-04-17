import { useContext, useCallback, memo } from "react";
import CardMUI from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.css";
import { isLiked } from "../../../../utils/is-liked";
import { UserContext } from "../../../../context/user-context";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { CommentOutlined } from "@ant-design/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormattingDate } from "../../../../hooks/useFormattingDate";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "currentColor",
});

export const Card = memo(function Card({
  _id,
  created_at,
  author,
  image,
  title,
  text,
  tags,
  likes = [],
  comments,
  onPostLike,
  onDeletePost,
}) {
  const { user } = useContext(UserContext);
  const dateCreationPost = useFormattingDate(created_at);
  const liked = isLiked(likes, user?._id);
  const isMyPost = author?._id === user?._id;

  const handleLikeClick = useCallback(() => {
    onPostLike({ _id, likes });
  }, [_id, likes, onPostLike]);

  const handleDeletePost = useCallback(() => {
    onDeletePost(_id).catch((err) => console.log(err));
  }, [_id, onDeletePost]);

  return (
    <CardMUI
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <CardHeader
          avatar={
            <Avatar
              alt={author?.name}
              src={author?.avatar}
              aria-label="recipe"
            />
          }
          title={author?.name}
          subheader={author?.about}
        />
        <StyledLink to={`/post/${_id}`}>
          <CardMedia component="img" height="194" image={image} alt="Uknown" />
          <CardContent>
            <h5>{title}</h5>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
            {tags?.length && (
              <div className={styles.tagContainer}>
                {tags.map((tag, i) => (
                  <div key={tag + i} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </StyledLink>
      </div>
      <div className={styles.cardFooter}>
        <CardActions sx={{ paddingTop: "0px" }} disableSpacing>
          <IconButton onClick={handleLikeClick} aria-label="add to favorites">
            <FavoriteIcon sx={{ color: liked ? red[500] : "" }} />
            <span className={styles.countLike}>
              {likes?.length !== 0 && likes.length}
            </span>
          </IconButton>
          {isMyPost && (
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon />
            </IconButton>
          )}
          {comments?.length !== 0 && (
            <IconButton sx={{ pointerEvents: "none" }}>
              <CommentOutlined />
              <span className={styles.countComment}>{comments.length}</span>
            </IconButton>
          )}
        </CardActions>
        <div className={styles.dateСreation}>{dateCreationPost}</div>
      </div>
    </CardMUI>
  );
});
