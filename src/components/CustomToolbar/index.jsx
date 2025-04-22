import React from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";

const CustomToolBar = ({
  searchValue,
  setSearchValue,
  handleSearch,
  setFilterOpen,
  hasFilterOption,
  actionButtons = [],
  handleCloseFilter,
  isFilterApplied,
  searchPlaceHolder,
  downloadParams,
  showDownload = false,
  handleDownload,
  disableDownload,
  disabledSearch = false
}) => {
  return (
    <Toolbar
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        px: { xs: 1, sm: 0 },
      }}
    >
      <LeftSection
        {...{
          handleSearch,
          searchValue,
          setSearchValue,
          searchPlaceHolder,
          hasFilterOption,
          setFilterOpen,
          handleCloseFilter,
          isFilterApplied,
          showDownload,
          handleDownload,
          disableDownload,
          disabledSearch
        }}
      />
      {actionButtons.length > 0 ? (
        <RightSection
          actionButtons={actionButtons}
          downloadParams={downloadParams}
        />
      ) : null}
    </Toolbar>
  );
};

const LeftSection = ({
  searchValue,
  setSearchValue,
  handleSearch,
  searchPlaceHolder,
  hasFilterOption,
  handleCloseFilter,
  setFilterOpen,
  isFilterApplied,
  showDownload,
  handleDownload,
  disableDownload,
  disabledSearch
}) => {
  return (
    <Box
      sx={{
        gap: "4px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: "65%" },
        mb: { xs: 1, sm: 0 },
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        sx={{ width: { xs: "100%", sm: "50%" } }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <TextField
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value?.trimStart())}
          type="text"
          label="Search"
          placeholder={searchPlaceHolder}
          sx={{
            input: { p: 1 },
            "& .MuiOutlinedInput-root": {
              pr: 0.1,
            },
          }}
          InputProps={{
            required: true,
            endAdornment: (
              <Button sx={{ minWidth: "40px" }} type="submit" data-testid="search-icon" disabled={disabledSearch}>
                <SearchIcon />
              </Button>
            ),
          }}
        />
      </Box>
      {isFilterApplied && (
        <Button
          onClick={handleCloseFilter}
          variant="outlined"
          startIcon={<CloseIcon
          
            data-testid="close-icon"

          
          
          />}
        >
          Clear All Filters
        </Button>
      )}
      {hasFilterOption && (
        <IconButton
          key="filter-icon"
          onClick={() => setFilterOpen(true)}
          sx={{ marginLeft: "10px" }}
          data-testid="filter-icon"

        >
          <FilterListIcon />
        </IconButton>
      )}
      {showDownload && (
        <IconButton onClick={handleDownload} disabled={disableDownload}>
          <DownloadIcon />
        </IconButton>
      )}
    </Box>
  );
};

const RightSection = ({ actionButtons, downloadParams }) => {
  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: { xs: "100%", sm: "50%" },
        mb: { xs: 1, sm: 0 },
      }}
    >
      {actionButtons.map((button) => {
        const { type, id, action, loading, disabled, icon, title } = button;
        if (type === "DOWNLOAD") {
          return (
            <IconButton
              key={id}
              onClick={(e) => action(e, downloadParams)}
              disabled={loading || disabled}
              data-testid="download-button"
            >
              {loading ? <CircularProgress size={25} /> : <GetAppIcon />}
            </IconButton>
          );
        }
        if (type === "BUTTON") {
          return (
            <Button
              key={id}
              onClick={action}
              startIcon={icon ?? ""}
              disabled={disabled}
              size="small"
              sx={{
                boxShadow: 3,
                maxWidth: { xs: "100%", sm: "70%" },
              }}
            >
              {title}
            </Button>
          );
        }
      })}
    </Box>
  );
};

export default CustomToolBar;
