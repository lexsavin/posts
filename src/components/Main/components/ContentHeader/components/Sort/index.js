import styles from "./styles.module.css";
import Button from "@mui/material/Button";
import { useCallback, memo } from "react";

export const Sort = memo(function Sort({ selectedSort, tabs, onChangeSort }) {
  const handleClick = useCallback(
    (tabId) => {
      onChangeSort(tabId);
    },
    [onChangeSort]
  );

  return (
    <div className={styles.sortContainer}>
      {tabs.map((tab) => (
        <Button
          onClick={() => handleClick(tab.id)}
          sx={{
            textTransform: "none",
            color:
              selectedSort === tab.id
                ? "rgba(0, 0, 0, 0.45)"
                : "rgba(0, 0, 0, 0.85)",
          }}
          key={tab.id}
          id={tab.id}
        >
          <span>{tab.title}</span>
        </Button>
      ))}
    </div>
  );
});
