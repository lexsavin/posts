import { NO_IMAGE_URL } from "../../../../../../utils/constants";

export const imagePostStyles = (props) => ({
  backgroundImage: `url(${props.image || NO_IMAGE_URL})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "450px",
  "@media (max-width: 430px)": {
    height: "250px",
  },
});

export const buttonStyles = {
  textTransform: "none",
  backgroundColor: "white",
  marginBottom: "15px",
  "&:hover": {
    backgroundColor: "white",
  },
};
