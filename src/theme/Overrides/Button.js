import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

const Button = (theme) => {
  return {
    MuiButton: {
      variants: [
        {
          props: { variant: 'cancel' },
          style: {
            backgroundColor: theme.palette.grey[600],
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.grey[700]
            },
            "&:disabled": {
              backgroundColor: theme.palette.grey[300]
            }
          }
        }
      ],
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          letterSpacing: "0.075rem",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z24,
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.z24,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
};

export default Button;
