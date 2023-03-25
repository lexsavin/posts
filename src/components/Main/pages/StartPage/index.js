import styles from "./styles.module.css";
import { useEffect, useState, useCallback, memo } from "react";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const StartPage = memo(function StartPage() {
  const [showAlertSuccessRegistration, setShowAlertSuccessRegistration] =
    useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSuccessRegistration = location.state?.isSuccessRegistration;

  const handleCloseAlertSuccessRegistration = useCallback(
    () => setShowAlertSuccessRegistration(false),
    []
  );

  useEffect(() => {
    if (isSuccessRegistration) {
      setShowAlertSuccessRegistration(true);
    }
    return () => setShowAlertSuccessRegistration(false);
  }, [isSuccessRegistration]);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          ВОЙДИТЕ В АККАУНТ ИЛИ ЗАРЕГИСТРИРУЙТСЬ!
        </h1>
      </div>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            borderColor: "black",
          }}
          onClick={() => navigate("/login")}
          variant="outlined"
        >
          Войти
        </Button>
        <Button
          sx={{
            textTransform: "none",
            color: "black",
            borderColor: "black",
          }}
          onClick={() => navigate("/register")}
          variant="outlined"
        >
          Регистрация
        </Button>
      </Box>
      {showAlertSuccessRegistration && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open
          autoHideDuration={6000}
          onClose={handleCloseAlertSuccessRegistration}
        >
          <Alert
            onClose={handleCloseAlertSuccessRegistration}
            severity="success"
            sx={{ width: "100%" }}
          >
            Вы успешно зарегистрировались!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
});
