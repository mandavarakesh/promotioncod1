import * as React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { Controller } from "react-hook-form";

function valuetext(value) {
  return `${value}°C`;
}
const minDistance = 10;

export default function RangeSlider({
  name,
  control,
  label,
  // placeholder,
  defaultValue,
  // sx = {},
  // required = false,
  // InputProps = {},
  // disabled = false,
  // type,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : [undefined, undefined]}
      render={({ field }) => {
        return (
          <Box
            sx={{
              position: "relative",
              border: "1px solid lightgrey",
              padding: "10px 15px 5px 15px",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                zIndex: "",
                backgroundColor: "white",

                padding: "3px",
                bottom: "40px",
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
            <Box
              sx={{
                // position: "absolute",
                zIndex: "99",
              }}
            >
              <Slider
                {...field}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={1000}
                disableSwap
              />
            </Box>
          </Box>
        );
      }}
    />
  );
}
