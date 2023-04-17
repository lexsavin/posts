import styles from "./styles.module.css";
import { Card } from "../../components/Card";
import { useContext, memo } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import { PostsContext } from "../../../../context/posts-context";
import { LoadingContext } from "../../../../context/loading-context";
import { SortContext } from "../../../../context/sort-context";
import { CardSkeleton } from "../../components/CardSkeleton";
import { Pagination } from "../../components/Pagination";
import { Box } from "@mui/material";

const sortСallbacks = {
  count_likes: (posts) =>
    [...posts].sort((a, b) => b.likes.length - a.likes.length),
  count_comments: (posts) =>
    [...posts].sort((a, b) => b.comments.length - a.comments.length),
};

export const CatalogPage = memo(function CatalogPage() {
  const { posts, handlePostLike, handleDeletePost } = useContext(PostsContext);
  const { selectedSort } = useContext(SortContext);
  const { isLoading } = useContext(LoadingContext);

  const sortedPosts =
    selectedSort === "by_date_added"
      ? posts
      : sortСallbacks[selectedSort](posts);

  const skeletons = new Array(12)
    .fill(<></>)
    .map((item, i) => <CardSkeleton key={"skeleton" + i} />);

  return (
    <div className={styles.container}>
      <ContentHeader />
      <div className={styles.cardList}>
        {isLoading
          ? skeletons
          : sortedPosts.map((post) => (
              <Card
                key={post._id}
                onPostLike={handlePostLike}
                onDeletePost={handleDeletePost}
                {...post}
              />
            ))}
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination />
      </Box>
    </div>
  );
});
