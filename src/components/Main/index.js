import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { StartPage } from "./pages/StartPage";
import { CatalogPage } from "./pages/CatalogPage";
import { PostPage } from "./pages/PostPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useLocation } from "react-router-dom";
import { mainStyles } from "./styles";
import { styled } from "@mui/system";
import { useContext, memo } from "react";
import { UserContext } from "../../context/user-context";

const StyledMain = styled("main")(mainStyles);

export const Main = memo(function Main() {
  const { pathname } = useLocation();
  const { token } = useContext(UserContext);

  const isCatalogPage = pathname === "/posts" && token;

  return (
    <StyledMain isCatalogPage={isCatalogPage}>
      <Routes>
        <Route
          path="/posts"
          element={token ? <CatalogPage /> : <StartPage />}
        />
        <Route path="/posts/login" element={<Login />} />
        <Route path="/posts/register" element={<Register />} />
        <Route path="/posts/post/:postId" element={<PostPage />} />
        <Route path="/posts/*" element={<NotFoundPage />} />
      </Routes>
    </StyledMain>
  );
});
