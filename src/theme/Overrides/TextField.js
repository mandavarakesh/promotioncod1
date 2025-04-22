const TextField = () => {
  return {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        InputLabelProps: { shrink: true },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red", fontSize: "1.4rem" },
      },
    },
  };
};

export default TextField;
