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

export const Register = memo(function Register() {
  const [showAlertError, setShowAlertError] = useState(false);
  const { handleSubmitSignUp: onSubmitSignUp } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const handleCloseForm = useCallback(() => {
    navigate("/");
    setShowAlertError(false);
  }, [navigate]);

  const handleCloseAlertError = useCallback(() => setShowAlertError(false), []);

  const handleFormSubmit = useCallback(
    (data) => {
      onSubmitSignUp(data)
        .then(() =>
          navigate("/", {
            state: {
              isSuccessRegistration: true,
            },
          })
        )
        .catch((err) => setShowAlertError(true));
    },
    [navigate, onSubmitSignUp]
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

  const groupInputProps = register("group", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
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
      <DialogTitle>Регистрация пользователя</DialogTitle>
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
            inputProps={groupInputProps}
            error={!!errors?.group}
            helperText={errors?.group?.message}
            margin="dense"
            label="Группа (введите: 'group-10')"
            type="text"
            fullWidth
            variant="outlined"
            name="group"
          />
          <TextField
            inputProps={passwordInputProps}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            margin="dense"
            label="Придумайте пароль"
            type="password"
            fullWidth
            variant="outlined"
            name="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Закрыть</Button>
          <Button type="submit">Регистрация</Button>
        </DialogActions>
      </form>
      {showAlertError && (
        <Alert onClose={handleCloseAlertError} severity="error">
          Непредвиденная ошибка на сервере!
        </Alert>
      )}
    </Dialog>
  );
});
