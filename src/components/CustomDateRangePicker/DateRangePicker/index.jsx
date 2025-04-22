import * as React from "react";
import {
  addMonths,
  addYears,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { getValidatedMonths, parseOptionalDate } from "./utils";
import Menu from "./Menu";
import { MARKERS } from "./Markers";

const DateRangePicker = ({
  onChange,
  initialDateRange,
  minDate,
  maxDate,
  locale,
  handleClose,
}) => {
  const today = new Date();

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialDateRange || {},
    minDateValid,
    maxDateValid
  );

  const [dateRange, setDateRange] = React.useState({ ...initialDateRange });
  const [hoverDay, setHoverDay] = React.useState();
  const [firstMonth, setFirstMonth] = React.useState(intialFirstMonth || today);
  const [secondMonth, setSecondMonth] = React.useState(
    initialSecondMonth || addMonths(firstMonth, 1)
  );

  const { startDate, endDate } = dateRange;

  // handlers
  const setFirstMonthValidated = (date) => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date) => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const onDayClick = (day) => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      const newRange = { startDate, endDate: day };
      onChange(newRange);
      setDateRange(newRange);
      handleClose()
    } else {
      setDateRange({ startDate: day, endDate: undefined });
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker, action) => {
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (day) =>
    startDate &&
    !endDate &&
    hoverDay &&
    isAfter(hoverDay, startDate) &&
    isWithinInterval(day, { start: startDate, end: hoverDay });

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  return (
    <Menu
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      helpers={helpers}
      handlers={handlers}
      locale={locale}
    />
  );
};

export default DateRangePicker;
