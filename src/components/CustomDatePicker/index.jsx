import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";

const formatDate = (date, type) => {
  if (type === "date") {
    if (date) {
      return date.format("YYYY-MM-DDT00:00:00");
    }
  } else {
    if (date) {
      return date.format("YYYY-MM-DDTHH:mm:ss");
    }
  }
  return null;
};

const CustomDatePicker = ({
  control,
  name,
  label,
  rules = {},
  defaultValue,
  disabled = false,
  required = false,
  type = "date",
  textFieldProps,
  isPastDisabled = false,
  onFocus = () => {},
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? null}
      render={({ field, fieldState: { error } }) => {
        const handleDateChange = (date) => {
          const formatedDate = formatDate(date, type);
          field.onChange(formatedDate);
          onFocus();
        };

        const commonProps = {
          label,
          disabled,
          onAccept: field.onBlur,
          onChange: handleDateChange,
          value: dayjs(field.value),
          slotProps: {
            textField: {
              required: required,
              error: !!error,
              helperText: error?.message,
              onBlur: field.onBlur,
              ...textFieldProps,
              sx: {
                ".css-93rqj-MuiInputAdornment-root": {
                  marginLeft: "4px",
                },
              },
            },
          },
          ...rest,
        };
        const minDate = isPastDisabled ? dayjs().startOf("day") : undefined;
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {type === "date-time" ? (
              <DateTimePicker
                timeSteps={{ minutes: 1 }}
                sx={{ width: "100%" }}
                inputRef={field.ref}
                format="DD/MM/YYYY hh:mm a"
                {...commonProps}
              />
            ) : (
              <DatePicker
                format="DD/MM/YYYY"
                minDate={minDate}
                inputRef={field.ref}
                {...commonProps}
              />
            )}
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default CustomDatePicker;
