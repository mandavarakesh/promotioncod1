import {FormControl, Grid, IconButton, MenuItem, Select} from '@mui/material';
import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {getMonth, getYear, setMonth, setYear} from 'date-fns';


const generateYears = (relativeTo, count) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i);
};

const Header = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale
}) => {
  const MONTHS = typeof locale !== 'undefined'
    ? [...Array(12).keys()].map(d => locale.localize?.month(d, {width: 'abbreviated', context: 'standalone'}))
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleMonthChange = (event) => {
    setDate(setMonth(date, parseInt(event.target.value, 10)));
  };

  const handleYearChange = (event) => {
    setDate(setYear(date, parseInt(event.target.value, 10)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getMonth(date)}
            onChange={handleMonthChange}
            MenuProps={{disablePortal: true}}
          >
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getYear(date)}
            onChange={handleYearChange}
            MenuProps={{ disablePortal: true }}
          >
            {generateYears(date, 30).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={nextDisabled}
          onClick={onClickNext}
        >
          <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;