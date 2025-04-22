import React from "react";
import {
  Typography,
  Box,
  List,
  ListItemText,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
  Stack,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import DynamicForm from "./DynamicForm";

const Dropzone = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FAFAFA",
  overflowX: "hidden",
  marginRight: "5px",
  cursor: "grabbing",
  padding: "5px",
});

const StyledTypograpy = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  padding: "3px 10px",
  borderRadius: "3px",
  gap: 2,
}));

const ConditionActionHandler = ({
  selectedItems,
  setSelectedItems,
  id,
  fields,
  whichForm,
  title = "",
  subTitle = "",
  onFocus,
}) => {
  const onDragStart = (event, dragItem) => {
    event.dataTransfer.setData("dragableItems", JSON.stringify(dragItem));
  };

  const onDrop = (event) => {
    event.preventDefault();
    const draggedItem = JSON.parse(event.dataTransfer.getData("dragableItems"));
    const isItemExits = selectedItems[id]?.find(
      (item) => item.id === draggedItem.id
    );
    if (!isItemExits) {
      setSelectedItems((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), draggedItem],
      }));
    }
  };

  const removeCondition = (e, itemId) => {
    e.preventDefault();
    setSelectedItems((prev) => ({
      ...prev,
      [id]: prev[id].filter((i) => i.id !== itemId),
    }));
  };

  return (
    <Stack direction="row">
      <Box flexGrow={1}>
        <StyledTypograpy variant="subtitle1">{title}</StyledTypograpy>
        <Dropzone onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
          <List>
            {selectedItems[id]?.length > 0 &&
              selectedItems[id].map((item, index) => (
                <Accordion variant="outlined" key={index} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <ListItemText primary={item.name} />
                      </Box>
                      <Box>
                        <IconButton
                          onClick={(e) => removeCondition(e, item.id)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      {item.formFields?.map?.((field) => (
                        <Box py={0.8} key={field.fieldId}>
                          <DynamicForm
                            itemName={`${id}.${item[whichForm]}`}
                            field={field}
                            onFocus={onFocus}
                          />
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            <Box
              sx={{
                minHeight: "60px",
                display: "grid",
                placeItems: "center",
                border: "1px dashed #C4CDD5",
                m: 1,
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                Drag and drop here
              </Typography>
            </Box>
          </List>
        </Dropzone>
      </Box>
      <Box sx={{ backgroundColor: "#FAFAFA", minWidth: "200px" }}>
        <StyledTypograpy variant="subtitle1">{subTitle}</StyledTypograpy>
        <Box minWidth={"300px"}>
          {fields.map((item) => {
            const isSelected = selectedItems[id]?.some(
              (selectedItem) => selectedItem.id === item.id
            );
            return (
              <Box
                key={item.id}
                draggable={!isSelected}
                onDragStart={(event) => !isSelected && onDragStart(event, item)}
                sx={{
                  p: 1,
                  cursor: isSelected ? "not-allowed" : "grab",
                  opacity: isSelected ? 0.5 : 1,
                }}
                square
                variant="outlined"
                component={Paper}
              >
                <Typography sx={{ fontSize: "14px" }}>{item.name}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Stack>
  );
};
export default ConditionActionHandler;
