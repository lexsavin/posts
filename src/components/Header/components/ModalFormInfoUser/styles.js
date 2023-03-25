import { NO_IMAGE_URL } from "../../../../utils/constants";

export const avatarStyles = (props) => ({
  backgroundImage: `url(${props.avatar || NO_IMAGE_URL})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "350px",
  height: "350px",
  borderRadius: "50%",
  "@media (max-width: 430px)": {
    width: "200px",
    height: "200px",
  },
});
