import { useState, useCallback, memo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import { imagePostStyles, buttonStyles } from "./styles";

const ImagePost = styled("div")(imagePostStyles);

export const ModalFormEditPost = memo(function ModalFormEditPost({
  image,
  title,
  text,
  tags,
  onEditPost,
}) {
  const [open, setOpen] = useState(false);
  const [backgroundImagePost, setBackgroundImagePost] = useState(null);

  const handleClickOpen = useCallback(() => {
    setBackgroundImagePost(null);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const bodyPost = Object.fromEntries(
        [...formData].map(([key, value]) => {
          if (key === "tags") {
            return value
              ? [key, value.replaceAll(" ", "").split(",")]
              : [key, []];
          } else {
            return [key, value];
          }
        })
      );

      onEditPost(bodyPost)
        .then(() => handleClose())
        .catch((err) => console.log(err));
    },
    [handleClose, onEditPost]
  );

  const handleChangeImagePost = useCallback((e) => {
    setBackgroundImagePost(e.target.value);
  }, []);

  return (
    <div>
      <Button sx={buttonStyles} variant="outlined" onClick={handleClickOpen}>
        Редактировать
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать пост</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Ссылка на изображение поста"
              type="text"
              fullWidth
              variant="outlined"
              name="image"
              onChange={handleChangeImagePost}
              defaultValue={image}
              required
            />
            <ImagePost image={backgroundImagePost ?? image} />
            <TextField
              margin="dense"
              label="Заголовок поста"
              type="text"
              fullWidth
              variant="outlined"
              name="title"
              defaultValue={title}
              required
            />
            <TextField
              margin="dense"
              label="Текст поста"
              type="text"
              fullWidth
              variant="outlined"
              name="text"
              multiline
              defaultValue={text}
              required
            />
            <TextField
              margin="dense"
              label="Тэги (ввод осуществляется через запятую)"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={tags}
              name="tags"
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
