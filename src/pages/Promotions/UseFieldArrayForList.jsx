import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const UseFieldArrayForList = ({ fieldId, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldId}`,
  });

  return (
    <Box>
      {fields.map((listItem, listItemIndex) => (
        <Box
          key={`${fieldId}-${listItemIndex}`}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Controller
            name={`${fieldId}[${listItemIndex}].value`}
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                value={field.value}
                label={`${fieldId} ${listItemIndex + 1}`}
                onChange={field.onChange}
              />
            )}
          />

          <IconButton onClick={() => remove(listItemIndex)} size="small">
            <ClearIcon />
          </IconButton>
        </Box>
      ))}
      <IconButton onClick={() => append({ value: "" })} size="small">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default UseFieldArrayForList;
