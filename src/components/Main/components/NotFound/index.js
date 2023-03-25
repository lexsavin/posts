import { memo } from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";

export const NotFound = memo(function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      className={styles.notFoundCard}
      status="404"
      title="404"
      subTitle="Извините, эта страница не существует."
      extra={
        <Button
          sx={buttonStyles}
          variant="outlined"
          onClick={() => navigate("/")}
        >
          На главную
        </Button>
      }
    />
  );
});

const buttonStyles = {
  textTransform: "none",
  backgroundColor: "white",
  marginBottom: "15px",
  "&:hover": {
    backgroundColor: "white",
  },
};
