import React from "react";
import { Box, TextField } from "@mui/material";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const DisabledTextField = ({ name, label, isDateField, control }) => {
  return (
    <Box sx={{ width: { xs: "95%", sm: "60%" }, pt: 2 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, value, ...rest } }) => {
          return (
            <TextField
              {...rest}
              value={
                value && isDateField ? dayjs(value).format("DD/MM/YYYY") : value
              }
              inputRef={ref}
              label={label}
              disabled
            />
          );
        }}
      />
    </Box>
  );
};

export default DisabledTextField;
