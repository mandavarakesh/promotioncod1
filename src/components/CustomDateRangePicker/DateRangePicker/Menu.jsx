/* eslint-disable object-curly-newline */
import React from "react";
import { differenceInCalendarMonths } from "date-fns";
import Month from "./Month";
import { MARKERS } from "./Markers";
import { Divider, Stack } from "@mui/material";

const Menu = (props) => {
  const {
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    helpers,
    handlers,
    locale,
  } = props;

  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Stack direction="row" wrap="nowrap">
      <Month
        {...commonProps}
        value={firstMonth}
        setValue={setFirstMonth}
        navState={[true, canNavigateCloser]}
        marker={MARKERS.FIRST_MONTH}
        locale={locale}
      />
      <Divider orientation="vertical" flexItem />
      <Month
        {...commonProps}
        value={secondMonth}
        setValue={setSecondMonth}
        navState={[canNavigateCloser, true]}
        marker={MARKERS.SECOND_MONTH}
        locale={locale}
      />
    </Stack>
  );
};

export default Menu;
