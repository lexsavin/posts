import background from "./background.svg";

export const mainStyles = ({ isCatalogPage }) => ({
  boxSizing: "border-box",
  padding: "20px 0px",
  backgroundColor: "#7fe1ff",
  backgroundImage: `url(${background})`,
  boxShadow: "inset 0 0 14px -8px",
  minHeight: "calc(100vh - 114px)",
  display: isCatalogPage ? "block" : "flex",
  alignItems: "center",
  justifyContent: "center",
});
