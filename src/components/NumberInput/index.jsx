import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const NumberInput = ({
  name,
  control,
  label,
  placeholder,
  defaultValue,
  sx = {},
  required = false,
  InputProps = {},
  disabled = false,
  type,
  onFocus = () => {},
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { ref, onChange, value, onBlur },
        fieldState: { error },
      }) => {
        return (
          <NumericFormat
            customInput={TextField}
            inputProps={{ type }}
            value={value ?? ""}
            inputRef={ref}
            onValueChange={(vals) => {
              onChange(vals.floatValue !== undefined ? vals.floatValue : null);
              onFocus();
            }}
            sx={sx}
            InputProps={InputProps}
            label={label}
            error={!!error}
            onBlur={onBlur}
            required={required}
            allowLeadingZeros={true}
            allowNegative={false}
            disabled={disabled}
            placeholder={placeholder}
            helperText={error?.message}
            decimalScale={10}
          />
        );
      }}
    />
  );
};

export default NumberInput;
