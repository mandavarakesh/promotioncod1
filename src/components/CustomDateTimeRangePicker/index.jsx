import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Controller } from "react-hook-form";
import { RangePicker } from "react-minimal-datetime-range";
import "react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css";
const CustomDateTimeRangePicker = ({ control, name, label, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? null}
      render={({ field, fieldState: { _error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  zIndex: "99",
                  backgroundColor: "white",

                  padding: "3px",
                  bottom: "45px",
                  left: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  {label}
                </Typography>
              </Box>

              <RangePicker
                locale={`en-us`}
                show={false}
                disabled={false}
                placeholder={["Start Time", "End Time"]}
                style={{
                  width: "100%",
                  margin: "10px auto 0",
                }}
                defaultDates={defaultValue}
                onConfirm={(res) => {
                  field.onChange(res?.map((i) => i?.trim()));
                }}
                onClear={() => {
                  field.onChange([]);
                }}
              />
            </Box>
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default CustomDateTimeRangePicker;
