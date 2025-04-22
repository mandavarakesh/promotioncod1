import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
  isSunday,
  isSaturday,
  isFirstDayOfMonth,
  isLastDayOfMonth,
} from "date-fns";
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from "./utils";
import Header from "./Header";
import Day from "./Day";

const NavigationAction = {
  Next: 1,
  Previous: -1,
};

const Month = (props) => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    locale,
  } = props;

  const weekStartsOn = locale?.options?.weekStartsOn || 0;
  const WEEK_DAYS =
    typeof locale !== "undefined"
      ? [...Array(7).keys()].map((d) =>
          locale.localize?.day((d + weekStartsOn) % 7, {
            width: "short",
            context: "standalone",
          })
        )
      : ["S", "M", "T", "W", "T", "F", "S"];
  const [back, forward] = props.navState;

  return (
    <Box sx={{ width: 290 }}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Next)
          }
          locale={locale}
        />

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          sx={{
            marginTop: "10px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          {WEEK_DAYS.map((day, index) => (
            <Typography color="textSecondary" key={index} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="space-between"
          sx={{
            paddingLeft: "15px",
            paddingRight: "15px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          {chunks(getDaysInMonth(date, locale), 7).map((week, idx) => (
            <Grid key={idx} container direction="row" justifyContent="center">
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted =
                  inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, "dd-MM-yyyy")}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(date, day) ||
                      !isWithinInterval(day, { start: minDate, end: maxDate })
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                    isSunday={isSunday(day)}
                    isSaturday={isSaturday(day)}
                    isFirstDayOfMonth={isFirstDayOfMonth(day)}
                    isLastDayOfMonth={isLastDayOfMonth(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Month;
