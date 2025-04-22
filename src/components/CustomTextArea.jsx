import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const CustomTextArea = ({ name, control, autoFocus }) => {
  const { control: contextControl } = useFormContext() ?? {};
  return (
    <Controller
      name={name}
      control={control ? control : contextControl}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => {
        return (
          <TextField
            role="multi-line-text-box"
            {...rest}
            autoFocus={autoFocus}
            inputRef={ref}
            minRows={2}
            multiline
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};

export default CustomTextArea;
