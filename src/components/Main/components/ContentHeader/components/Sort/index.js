import styles from "./styles.module.css";
import Button from "@mui/material/Button";
import { useCallback, memo, useContext } from "react";
import { SortContext } from "../../../../../../context/sort-context";

const tabs = [
  { id: "by_date_added", title: "По дате добавления" },
  {
    id: "count_likes",
    title: "По количеству лайков",
  },
  {
    id: "count_comments",
    title: "По количеству комментариев",
  },
];

export const Sort = memo(function Sort() {
  const { selectedSort, setSelectedSort } = useContext(SortContext);

  const handleClick = useCallback(
    (tabId) => {
      setSelectedSort(tabId);
    },
    [setSelectedSort]
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
