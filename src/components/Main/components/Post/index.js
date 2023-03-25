import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "@mui/material/Button";
import { useContext, useCallback, memo } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { isLiked } from "../../../../utils/is-liked";
import { UserContext } from "../../../../context/user-context";
import { Box } from "@mui/system";
import { buttonStyles, cardStyles } from "./styles";
import { useFormattingDate } from "../../../../hooks/useFormattingDate";
import { Comment } from "./components/Comment";
import { ModalFormEditPost } from "./components/ModalFormEditPost";

export const Post = memo(function Post({
  _id,
  created_at,
  author,
  image,
  title,
  text,
  tags,
  likes = [],
  comments = [],
  onPostLike,
  onEditPost,
  onDeletePost,
}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dateCreationPost = useFormattingDate(created_at);
  const liked = isLiked(likes, user?._id);
  const isMyPost = author?._id === user?._id;

  const handleLikeClick = useCallback(() => {
    onPostLike({ _id, likes });
  }, [_id, likes, onPostLike]);

  const handleDeletePost = useCallback(() => {
    onDeletePost(_id)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  }, [_id, navigate, onDeletePost]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          sx={buttonStyles}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
        {isMyPost && (
          <div className={styles.myPostButton}>
            <ModalFormEditPost
              image={image}
              title={title}
              text={text}
              tags={tags}
              onEditPost={onEditPost}
            />
            <Button
              sx={buttonStyles}
              variant="outlined"
              onClick={handleDeletePost}
            >
              Удалить
            </Button>
          </div>
        )}
      </div>
      <Card sx={cardStyles}>
        <Box sx={{ flexBasis: "62%" }}>
          <CardMedia
            sx={{ height: "100%" }}
            component="img"
            height="194"
            image={image}
            alt="Uknown"
          />
        </Box>
        <Box sx={{ flexBasis: "38%", paddingBottom: "16px" }}>
          <CardHeader
            avatar={
              <Avatar
                alt={author?.name}
                src={author?.avatar}
                aria-label="recipe"
              />
            }
            title={author?.name}
            subheader={dateCreationPost}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardActions disableSpacing>
              <IconButton
                onClick={handleLikeClick}
                aria-label="add to favorites"
              >
                <FavoriteIcon sx={{ color: liked ? red[500] : "" }} />
                <span className={styles.countLike}>
                  {likes?.length !== 0 && likes.length}
                </span>
              </IconButton>
            </CardActions>
            {tags?.length && (
              <div className={styles.tagContainer}>
                {tags.map((tag) => (
                  <div key={tag} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </Box>
          <CardContent>
            <h5 className={styles.titleContent}>{title}</h5>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
          {comments.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
        </Box>
      </Card>
    </div>
  );
});
