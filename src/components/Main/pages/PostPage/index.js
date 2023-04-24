import { useContext, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../components/Post";
import { PostsContext } from "../../../../context/posts-context";
import { useApi } from "../../../../hooks/useApi";
import { api } from "../../../../utils/api";
import { UserContext } from "../../../../context/user-context";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

export const PostPage = memo(function PostPage() {
  const { postId } = useParams();
  const { token } = useContext(UserContext);
  const {
    handlePostLike: onPostLike,
    handleEditPost: onEditPost,
    handleDeletePost,
  } = useContext(PostsContext);

  const handleGetPost = useCallback(
    () => api.getPostById(postId, token),
    [postId, token]
  );

  const {
    data: post,
    setData: setPost,
    loading: isLoading,
  } = useApi(handleGetPost);

  const handlePostLike = useCallback(() => {
    onPostLike(post).then((updatedPost) => {
      setPost(updatedPost);
    });
  }, [post, onPostLike, setPost]);

  const handleEditPost = useCallback(
    (dataPost) => {
      return onEditPost(post._id, dataPost).then((updatedPost) => {
        setPost(updatedPost);

        return updatedPost;
      });
    },
    [onEditPost, post, setPost]
  );

  const skeletons = new Array(25)
    .fill(<></>)
    .map((item, i) => <Skeleton key={"skeleton" + i} animation="wave" />);

  return isLoading ? (
    <Box sx={{ width: "100%", margin: "16px" }}>{skeletons}</Box>
  ) : (
    <Post
      {...post}
      onPostLike={handlePostLike}
      onEditPost={handleEditPost}
      onDeletePost={handleDeletePost}
    />
  );
});
