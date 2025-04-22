import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { React } from "react";
import { Controller } from "react-hook-form";
import { format, parse } from "date-fns";

const CustomTimePicker = ({ name, label, disabled, control, required }) => {
  const parseTime = (timeString) => {
    const parsedDate = parse(timeString, "HH:mm", new Date());
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          
          const handleDateChange = (date) => {
            const formatedTime = date ? format(date, "HH:mm") : null;
            field.onChange(formatedTime);
          };

          return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label={label}
                disabled={disabled}
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: error?.message,
                    onBlur: field.onBlur,
                    required: required,
                    placeholder: 'HH:MM AM/PM' 
                  },
                }}
                onAccept={field.onBlur}
                onChange={handleDateChange}
                value={parseTime(field.value)}
                inputRef={field.ref}
              />
            </LocalizationProvider>
          );
        }}
      />
    </>
  );
};

export default CustomTimePicker;
