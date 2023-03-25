import styles from "./styles.module.css";
import { Card } from "../../components/Card";
import { useContext, useState, useCallback, memo } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import { PostsContext } from "../../../../context/posts-context";
import { LoadingContext } from "../../../../context/loading-context";
import { CardSkeleton } from "../../components/CardSkeleton";

const tabs = [
  { id: "all_posts", title: "Все посты" },
  {
    id: "count_likes",
    title: "По количеству лайков",
  },
  {
    id: "count_comments",
    title: "По количеству комментариев",
  },
];

const sortСallbacks = {
  count_likes: (posts) =>
    [...posts].sort((a, b) => b.likes.length - a.likes.length),
  count_comments: (posts) =>
    [...posts].sort((a, b) => b.comments.length - a.comments.length),
};

export const CatalogPage = memo(function CatalogPage() {
  const { posts, handlePostLike, handleDeletePost } = useContext(PostsContext);
  const { isLoading } = useContext(LoadingContext);
  const [selectedSort, setSelectedSort] = useState("all_posts");

  const sortedPosts =
    selectedSort === "all_posts" ? posts : sortСallbacks[selectedSort](posts);

  const handleChangeSort = useCallback((tabId) => setSelectedSort(tabId), []);

  const skeletons = new Array(12)
    .fill(<></>)
    .map((item, i) => <CardSkeleton key={"skeleton" + i} />);

  return (
    <div className={styles.container}>
      <ContentHeader
        selectedSort={selectedSort}
        onChangeSort={handleChangeSort}
        tabs={tabs}
      />
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
    </div>
  );
});
