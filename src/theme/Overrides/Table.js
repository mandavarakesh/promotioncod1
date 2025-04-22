// ----------------------------------------------------------------------

const Table = (theme) => {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
  };
};

export default Table;
