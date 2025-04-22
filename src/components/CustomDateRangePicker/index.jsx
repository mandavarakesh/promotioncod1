import { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import { Box, Paper, Popover, Stack, TextField } from "@mui/material";
import { format } from "date-fns";
import { Controller } from "react-hook-form";

function CustomDateRangePicker({ name, control, inputSize }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const getDateValue = (date) => {
    let formated = "DD/MM/YYYY";
    if (date) {
      formated = format(date, "dd/MM/yyyy");
    }
    return formated;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ref, onChange, onBlur } }) => {
        return (
          <>
            <Stack
              aria-describedby={id}
              onClick={handleClick}
              spacing={1}
              direction="row"
            >
              <TextField
                label="Start Date"
                placeholder="DD/MM/YYYY"
                inputRef={ref}
                onBlur={onBlur}
                value={value ? getDateValue(value?.startDate) : undefined}
                size={inputSize}
                data-testid={"date-picker"}
              />
              <Box
                sx={{
                  display: "flex",
                  pt: inputSize !== "small" ? 1.2 : 0,
                  color: "grey",
                }}
              >
                _
              </Box>
              <TextField
                label="End Date"
                inputRef={ref}
                onBlur={onBlur}
                placeholder="DD/MM/YYYY"
                value={value ? getDateValue(value?.endDate) : undefined}
                size={inputSize}
              />
            </Stack>
            <Popover
              onClose={handleClose}
              id={id}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              data-testid="datePopup-open"
            >
              <Paper sx={{ p: 1 }}>
                <DateRangePicker
                  minDate={new Date("01-01-1900")}
                  onChange={(range) => onChange(range)}
                  handleClose={handleClose}
                />
              </Paper>
            </Popover>
          </>
        );
      }}
    />
  );
}

export default CustomDateRangePicker;
