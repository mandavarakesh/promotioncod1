import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomAutocomplete = ({
  options,
  name,
  label,
  control,
  rules = {},
  loading = false,
  disabled = false,
  required = false,
  defaultValue = "",
  placeholder,
  getOptionDisabled,
  disableClearable = false,
  onFocus = () => {},
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref, onBlur } = field;
        return (
          <Autocomplete
            getOptionDisabled={getOptionDisabled}
            value={
              value !== undefined
                ? options.find(
                    (option) => value?.toString() === option.value?.toString()
                  ) ?? null
                : null
            }
            disableClearable={disableClearable}
            onChange={(_event, newValue) => {
              onChange(newValue ? newValue.value : defaultValue);
              onFocus();
            }}
            options={options}
            isOptionEqualToValue={(option, selectedOption) =>
              option.title === selectedOption.title
            }
            disabled={disabled}
            getOptionLabel={(option) => option.title}
            slotProps={{
              clearIndicator: {
                onClick: () => onChange(null),
              },
            }}
            renderInput={(params) => (
              <TextField
                placeholder={placeholder}
                {...params}
                label={label}
                onBlur={onBlur}
                inputRef={ref}
                required={required}
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
};

export default CustomAutocomplete;
