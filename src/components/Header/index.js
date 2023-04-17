import { useContext, useCallback, memo } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import { ModalFormInfoUser } from "./components/ModalFormInfoUser";
import { UserContext } from "../../context/user-context";
import { SortContext } from "../../context/sort-context";
import { PostsContext } from "../../context/posts-context";
import { PaginationContext } from "../../context/pagination-contex";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { clearTokenLocalStorage } from "../../utils/token";
import styles from "./styles.module.css";

export const Header = memo(function Header() {
  const { token, setToken, user, setUser, handleUpdateUser } =
    useContext(UserContext);
  const { setSelectedSort } = useContext(SortContext);
  const { setPosts } = useContext(PostsContext);
  const { setPagePagination, setTotalPagination } =
    useContext(PaginationContext);
  const navigate = useNavigate();

  const handleRedirectMainPage = useCallback(() => {
    setPagePagination(1);
    navigate("/");
  }, [navigate, setPagePagination]);

  const handleSignOut = useCallback(() => {
    clearTokenLocalStorage();
    setToken(null);
    setUser(null);
    setSelectedSort("by_date_added");
    setPosts([]);
    setPagePagination(1);
    setTotalPagination(null);
    navigate("/");
  }, [
    navigate,
    setPagePagination,
    setPosts,
    setSelectedSort,
    setToken,
    setTotalPagination,
    setUser,
  ]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            onClick={handleRedirectMainPage}
            className={styles.logoContainer}
          >
            <Logo className={styles.logo} />
            <div className={styles.title}>Реактивные посты</div>
          </div>
          {token && (
            <div className={styles.user}>
              <img className={styles.avatar} src={user?.avatar} alt="avatar" />
              <div className={styles.infoUser}>
                <div>
                  <div>{user?.name}</div>
                  <div>{user?.email}</div>
                </div>
                <ModalFormInfoUser onUpdateUser={handleUpdateUser} {...user} />
                <Button
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                  onClick={handleSignOut}
                >
                  Выход
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});
