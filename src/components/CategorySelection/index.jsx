import React from "react";
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
  styled,
} from "@mui/material";
import Scrollbar from "../Scrollbar/Scrollbar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const StyledList = styled(List)(({ theme }) => ({
  width:'clamp(320px,100%,100%)',
  border: "0.3px solid #BBB",
  borderRadius: "0.2rem",
  overflow: "hidden",
  "& .listItem": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  "& .listItemsScroller": {
    maxHeight: "270px",
  },
  "& .selectd": {
    backgroundColor: theme.palette.primary.lighter,
  },
  "& .centeredListItem": {
    height: "50px",
    display: "flex",
    placeContent: "center",
    color: "red",
  },
}));

const CategorySelection = ({
  level,
  disabled,
  selectedCategories,
  selectedCategoryList = [],
  handleListItemClick,
  categoryList = [],
  isLoading = false,
  isError = false,
}) => {
  const renderListItems = (listLevel, list, loading, error) => {
    if (loading) {
      return (
        <ListItem className="centeredListItem">
          <CircularProgress size={25} />
        </ListItem>
      );
    }

    if (error) {
      return (
        <ListItem className="centeredListItem">Something went worng</ListItem>
      );
    }

    if (list.length > 0) {
      return list?.map((item) => {
        const itemKey = item?.slug;
        const itemName = item?.lang?.en?.name;
        const isSelected = selectedCategories[listLevel]?.slug === itemKey;
        return (
          <ListItemButton
            key={itemKey}
            className={isSelected ? "listItem selectd" : "listItem"}
            onClick={() => handleListItemClick(listLevel, item)}
          >
            <Typography variant="body1" fontSize="1rem">
              {itemName}
            </Typography>
            {listLevel !== 3 && <KeyboardArrowRightIcon />}
          </ListItemButton>
        );
      });
    }
  };
  return (
    <StyledList
      data-testid="catergory-selection-wrapper"
      className={disabled ? "disabled" : ""}
    >
      <HeaderItem level={level} />
      <Divider sx={{ borderBottomWidth: "0.3px" }} color="#BBB" />
      <Scrollbar className="listItemsScroller">
        {level === 0
          ? renderListItems(level, categoryList, isLoading, isError)
          : renderListItems(level, selectedCategoryList)}
      </Scrollbar>
    </StyledList>
  );
};

const HeaderItem = ({ level }) => {
  return (
    <ListItem sx={{ display: "block" }}>
      <Typography variant="h6">
        {level === 0 ? "Category" : "Sub - Category"}
      </Typography>
      <Typography variant="body1" color="text.disabled">
        {`Level ${level + 1}`}
      </Typography>
    </ListItem>
  );
};

export default CategorySelection;
