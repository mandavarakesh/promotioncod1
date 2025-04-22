import {
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    isBefore,
    addDays,
    isSameDay,
    isWithinInterval,
    isSameMonth,
    addMonths,
    parseISO,
    isValid,
    min,
    max,
  } from 'date-fns';
    
  export const chunks = (array, size) => (
    Array.from(
      { length: Math.ceil(array.length / size) },
      (_v, i) => array.slice(i * size, i * size + size),
    )
  );
  
  // Date
  export const getDaysInMonth = (date, locale) => {
    const startWeek = startOfWeek(startOfMonth(date), {locale});
    const endWeek = endOfWeek(endOfMonth(date), {locale});
    const days = [];
    for (let curr = startWeek; isBefore(curr, endWeek);) {
      days.push(curr);
      curr = addDays(curr, 1);
    }
    return days;
  };
  
  export const isStartOfRange = ({ startDate }, day) => (startDate && isSameDay(day, startDate))
  
  export const isEndOfRange = ({ endDate }, day) => (endDate && isSameDay(day, endDate));
  
  export const inDateRange = ({ startDate, endDate }, day) => (
    startDate
    && endDate
    && (isWithinInterval(day, { start: startDate, end: endDate })
    || isSameDay(day, startDate)
    || isSameDay(day, endDate))
  )
  
  export const isRangeSameDay = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      return isSameDay(startDate, endDate);
    }
    return false;
  };
  
  
  export const parseOptionalDate = (date, defaultValue) => {
    if (date) {
      const parsed = date instanceof Date ? date : parseISO(date);
      if (isValid(parsed)) return parsed;
    }
    return defaultValue;
  };
  
  export const getValidatedMonths = (range, minDate, maxDate) => {
    const { startDate, endDate } = range;
    if (startDate && endDate) {
      const newStart = max([startDate, minDate]);
      const newEnd = min([endDate, maxDate]);
  
      return [newStart, isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd];
    }
    return [startDate, endDate];
  };