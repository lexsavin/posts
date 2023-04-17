import { useState, useEffect, useCallback, memo } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { api } from "./utils/api.js";
import { isLiked } from "./utils/is-liked";
import { UserContext } from "./context/user-context";
import { PostsContext } from "./context/posts-context";
import { LoadingContext } from "./context/loading-context";
import { SortContext } from "./context/sort-context";
import { PaginationContext } from "./context/pagination-contex";
import { getTokenLocalStorage, setTokenLocalStorage } from "./utils/token";
import { COUNT_POSTS_PER_PAGE } from "./utils/constants";

export const App = memo(function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(getTokenLocalStorage());
  const [selectedSort, setSelectedSort] = useState("by_date_added");
  const [isLoading, setIsLoading] = useState(false);
  const [pagePagination, setPagePagination] = useState(1);
  const [totalPagination, setTotalPagination] = useState(null);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    Promise.all([
      api.getPostsList(pagePagination, token),
      api.getUserInfo(token),
    ])
      .then(([{ posts, total }, userData]) => {
        setUser(userData);
        setPosts(posts);
        setTotalPagination(Math.ceil(total / COUNT_POSTS_PER_PAGE));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [pagePagination, token]);

  const handleRequestPosts = useCallback(() => {
    if (!token) return;

    setIsLoading(true);

    return api
      .getPostsList(pagePagination, token)
      .then((postsData) => {
        setPosts(postsData.posts);
        setTotalPagination(Math.ceil(postsData.total / COUNT_POSTS_PER_PAGE));

        return postsData;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [pagePagination, token]);

  const handleSubmitSignIn = useCallback(
    (authorizationData) =>
      api.signIn(authorizationData).then(({ token }) => {
        setTokenLocalStorage(token);
        setToken(token);

        return token;
      }),
    []
  );

  const handleSubmitSignUp = useCallback(
    (authorizationData) => api.signUp(authorizationData).then((data) => data),
    []
  );

  const handleUpdateUser = useCallback(
    (userUpdateData, avatarUpdateData) =>
      Promise.all([
        api.setUserInfo(userUpdateData, token),
        api.setUserAvatar(avatarUpdateData, token),
        api.getPostsList(pagePagination, token),
      ]).then(([newUserUpdatedData, newUserUpdatedAvatar, postsData]) => {
        const updatedUser = {
          ...newUserUpdatedData,
          avatar: newUserUpdatedAvatar.avatar,
        };

        setUser(updatedUser);
        setPosts(postsData.posts);

        return [newUserUpdatedData, newUserUpdatedAvatar, postsData];
      }),
    [pagePagination, token]
  );

  const handlePostLike = useCallback(
    (post) => {
      const liked = isLiked(post.likes, user._id);

      return api.changeLikePost(post._id, liked, token).then((updatedPost) => {
        const newPosts = posts.map((postState) => {
          return postState._id === updatedPost._id ? updatedPost : postState;
        });
        setPosts(newPosts);

        return updatedPost;
      });
    },
    [posts, token, user]
  );

  const handleCreatePost = useCallback(
    (dataPost) =>
      api.createPost(dataPost, token).then((newPost) => {
        handleRequestPosts();

        return newPost;
      }),
    [handleRequestPosts, token]
  );

  const handleEditPost = useCallback(
    (postId, dataPost) =>
      api.editPostById(postId, dataPost, token).then((updatedPost) => {
        const newPosts = posts.map((postState) => {
          return postState._id === updatedPost._id ? updatedPost : postState;
        });
        setPosts(newPosts);

        return updatedPost;
      }),
    [posts, token]
  );

  const handleDeletePost = useCallback(
    (postId) =>
      api.deletePostById(postId, token).then((deletedPost) => {
        handleRequestPosts();

        return deletedPost;
      }),
    [handleRequestPosts, token]
  );

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <UserContext.Provider
        value={{
          handleSubmitSignIn,
          handleSubmitSignUp,
          token,
          setToken,
          user,
          setUser,
          handleUpdateUser,
        }}
      >
        <SortContext.Provider value={{ selectedSort, setSelectedSort }}>
          <PostsContext.Provider
            value={{
              posts,
              setPosts,
              handleCreatePost,
              handleEditPost,
              handleDeletePost,
              handlePostLike,
            }}
          >
            <PaginationContext.Provider
              value={{
                pagePagination,
                setPagePagination,
                totalPagination,
                setTotalPagination,
              }}
            >
              <Header />
              <Main />
              <Footer />
            </PaginationContext.Provider>
          </PostsContext.Provider>
        </SortContext.Provider>
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
});
