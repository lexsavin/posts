import { useContext, useCallback, memo } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import { ModalFormInfoUser } from "./components/ModalFormInfoUser";
import { UserContext } from "../../context/user-context";
import { PostsContext } from "../../context/posts-context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { clearTokenLocalStorage } from "../../utils/token";
import styles from "./styles.module.css";

export const Header = memo(function Header() {
  const { token, setToken, user, setUser, handleUpdateUser } =
    useContext(UserContext);
  const { setPosts } = useContext(PostsContext);
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    clearTokenLocalStorage();
    setToken(null);
    setUser(null);
    setPosts([]);
    navigate("/");
  }, [navigate, setPosts, setToken, setUser]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link className={styles.link} to="/">
            <div className={styles.logoContainer}>
              <Logo className={styles.logo} />
              <div className={styles.title}>Реактивные посты</div>
            </div>
          </Link>
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
