import { useContext, useCallback, memo } from "react";
import PaginationMUI from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { PaginationContext } from "../../../../context/pagination-contex";

export const Pagination = memo(function Pagination() {
  const { pagePagination, setPagePagination, totalPagination } =
    useContext(PaginationContext);

  const handleChangePage = useCallback(
    (event, newPage) => setPagePagination(newPage),
    [setPagePagination]
  );

  return (
    totalPagination && (
      <Box sx={{ backgroundColor: "white", maxWidth: "343px" }}>
        <PaginationMUI
          page={pagePagination}
          count={totalPagination}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    )
  );
});
