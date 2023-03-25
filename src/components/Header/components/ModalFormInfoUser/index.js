import { useState, useCallback, memo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { avatarStyles } from "./styles";

const Avatar = styled("div")(avatarStyles);

export const ModalFormInfoUser = memo(function ModalFormInfoUser({
  name,
  avatar,
  about,
  email,
  onUpdateUser,
}) {
  const [open, setOpen] = useState(false);
  const [backgroundImageAvatar, setBackgroundImageAvatar] = useState(null);

  const handleClickOpen = useCallback(() => {
    setBackgroundImageAvatar(null);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const bodyUserInfo = Object.fromEntries(
        [...formData].filter(([key, value]) => key !== "avatar")
      );
      const bodyUserAvatar = Object.fromEntries(
        [...formData].filter(([key, value]) => key === "avatar")
      );

      onUpdateUser(bodyUserInfo, bodyUserAvatar)
        .then(() => handleClose())
        .catch((err) => console.log(err));
    },
    [handleClose, onUpdateUser]
  );

  const handleChangeAvatar = useCallback((e) => {
    setBackgroundImageAvatar(e.target.value);
  }, []);

  return (
    <div>
      <Button
        sx={{ textTransform: "none" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Профиль
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Профиль пользователя</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                margin="dense"
                label="Ссылка на аватар пользователя"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={avatar}
                name="avatar"
                onChange={handleChangeAvatar}
                required
              />
              <Avatar avatar={backgroundImageAvatar ?? avatar} />
            </Box>
            <TextField
              margin="dense"
              label="Имя пользователя"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={name}
              name="name"
              required
            />
            <TextField
              margin="dense"
              label="Информация о пользователе"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={about}
              name="about"
              multiline
              required
            />
            <TextField
              margin="dense"
              label="Электронная почта"
              type="text"
              fullWidth
              variant="outlined"
              disabled
              defaultValue={email}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button type="submit">Обновить информацию</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
});
