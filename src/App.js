import { useState, useEffect, useCallback, memo } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { api } from "./utils/api.js";
import { isLiked } from "./utils/is-liked";
import { UserContext } from "./context/user-context";
import { PostsContext } from "./context/posts-context";
import { LoadingContext } from "./context/loading-context";
import { getTokenLocalStorage, setTokenLocalStorage } from "./utils/token";

export const App = memo(function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(getTokenLocalStorage());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    Promise.all([api.getPostsList(token), api.getUserInfo(token)])
      .then(([postsData, userData]) => {
        setUser(userData);
        setPosts(postsData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const handleSubmitSignIn = useCallback((authorizationData) => {
    return api.signIn(authorizationData).then(({ token }) => {
      setTokenLocalStorage(token);
      setToken(token);

      return token;
    });
  }, []);

  const handleSubmitSignUp = useCallback((authorizationData) => {
    return api.signUp(authorizationData).then((data) => data);
  }, []);

  const handleUpdateUser = useCallback(
    (userUpdateData, avatarUpdateData) => {
      return Promise.all([
        api.setUserInfo(userUpdateData, token),
        api.setUserAvatar(avatarUpdateData, token),
        api.getPostsList(token),
      ]).then(([newUserUpdatedData, newUserUpdatedAvatar, postsData]) => {
        const updatedUser = {
          ...newUserUpdatedData,
          avatar: newUserUpdatedAvatar.avatar,
        };

        setUser(updatedUser);
        setPosts(postsData);

        return [newUserUpdatedData, newUserUpdatedAvatar, postsData];
      });
    },
    [token]
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
    (dataPost) => {
      return api.createPost(dataPost, token).then((newPost) => {
        const newPosts = [newPost, ...posts];
        setPosts(newPosts);

        return newPost;
      });
    },
    [posts, token]
  );

  const handleEditPost = useCallback(
    (postId, dataPost) => {
      return api.editPostById(postId, dataPost, token).then((updatedPost) => {
        const newPosts = posts.map((postState) => {
          return postState._id === updatedPost._id ? updatedPost : postState;
        });
        setPosts(newPosts);

        return updatedPost;
      });
    },
    [posts, token]
  );

  const handleDeletePost = useCallback(
    (postId) => {
      return api.deletePostById(postId, token).then((deletedPost) => {
        const newPosts = posts.filter(
          (postState) => postState._id !== deletedPost._id
        );
        setPosts(newPosts);

        return deletedPost;
      });
    },
    [posts, token]
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
          <Header />
          <Main />
          <Footer />
        </PostsContext.Provider>
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
});
