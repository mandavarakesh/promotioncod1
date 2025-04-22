import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTimePickerValue({ defaultValue, label }) {
  const [value, setValue] = React.useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        {/* <DateTimePicker
          label={"Uncontrolled picker"}
        //   defaultValue={dayjs('2022-04-17T15:30')}
          defaultValue={defaultValue}
        /> */}
        <DateTimePicker
          label={label}
          value={value}
          defaultValue={dayjs(defaultValue)}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
