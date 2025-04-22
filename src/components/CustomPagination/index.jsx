import { Box, IconButton, useTheme } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

function CustomPagination(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = () => {
    onPageChange((pageInfo) => ({
      ...pageInfo,
      page: pageInfo.page - 1,
    }));
  };

  const handleNextButtonClick = () => {
    onPageChange((pageInfo) => ({
      ...pageInfo,
      page: pageInfo.page + 1,
    }));
  };

  function labelDisplayedRows({ from, to, rowCount }) {
    let message = rowCount !== -1 ? rowCount : `more than ${to}`;
    return `${from}–${to} of ${message}`;
  }

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? count
      : Math.min(count, (page + 1) * rowsPerPage);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      {labelDisplayedRows({
        from: count === 0 ? 0 : page * rowsPerPage + 1,
        to: getLabelDisplayedRowsTo(),
        rowCount: count === -1 ? -1 : count,
        page,
      })}
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
}

export default CustomPagination;
