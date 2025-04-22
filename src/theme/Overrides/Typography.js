// ----------------------------------------------------------------------

const Typography = (theme) => {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        h5: {
          fontWeight: 700
        },
        h6: {
          fontWeight: 700
        }
      },
    },
  };
};

export default Typography;
