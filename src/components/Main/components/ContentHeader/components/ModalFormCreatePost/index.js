import { useState, useContext, useCallback, memo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";
import { PostsContext } from "../../../../../../context/posts-context";
import { imagePostStyles } from "./styles";

const ImagePost = styled("div")(imagePostStyles);

export const ModalFormCreatePost = memo(function ModalFormCreatePost() {
  const { handleCreatePost: onCreatePost } = useContext(PostsContext);
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

      onCreatePost(bodyPost)
        .then(() => handleClose())
        .catch((err) => console.log(err));
    },
    [handleClose, onCreatePost]
  );

  const handleChangeImagePost = useCallback((e) => {
    setBackgroundImagePost(e.target.value);
  }, []);

  return (
    <div>
      <Button
        sx={{ textTransform: "none" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Создать пост
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Создать пост</DialogTitle>
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
              required
            />
            <ImagePost image={backgroundImagePost} />
            <TextField
              margin="dense"
              label="Заголовок поста"
              type="text"
              fullWidth
              variant="outlined"
              name="title"
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
              required
            />
            <TextField
              margin="dense"
              label="Тэги (ввод осуществляется через запятую)"
              type="text"
              fullWidth
              variant="outlined"
              name="tags"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button type="submit">Создать</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
});
