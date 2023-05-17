import { useContext, useState, useCallback, memo } from "react";
import { UserContext } from "../../../../context/user-context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  VALIDATE_CONFIG,
} from "../../../../utils/constants";
import styles from "./styles.module.css";

export const Login = memo(function Login() {
  const [showAlertError, setShowAlertError] = useState(false);
  const { handleSubmitSignIn: onSubmitSignIn } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const handleCloseForm = useCallback(() => {
    navigate("/posts");
    setShowAlertError(false);
  }, [navigate]);

  const handleCloseAlert = useCallback(() => setShowAlertError(false), []);

  const handleFormSubmit = useCallback(
    (data) => {
      onSubmitSignIn(data)
        .then(() => handleCloseForm())
        .catch((err) => setShowAlertError(true));
    },
    [handleCloseForm, onSubmitSignIn]
  );

  const emailInputProps = register("email", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.emailMessage,
    },
  });

  const passwordInputProps = register("password", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASSWORD_REGEXP,
      message: VALIDATE_CONFIG.passwordMesssage,
    },
  });

  return (
    <Dialog open onClose={handleCloseForm}>
      <DialogTitle>Вход</DialogTitle>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            inputProps={emailInputProps}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            margin="dense"
            label="Введите электронную почту"
            type="text"
            fullWidth
            variant="outlined"
            name="email"
          />
          <TextField
            inputProps={passwordInputProps}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            margin="dense"
            label="Введите пароль"
            type="password"
            fullWidth
            variant="outlined"
            name="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Закрыть</Button>
          <Button type="submit">Вход</Button>
        </DialogActions>
      </form>
      {showAlertError && (
        <Alert onClose={handleCloseAlert} severity="error">
          Неправильные почта или пароль!
        </Alert>
      )}
    </Dialog>
  );
});
