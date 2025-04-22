import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------
// SETUP COLORS
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

//  Color TEAL for Operator View
const PRIMARY = {
  lighter: "#e0f2f1", //[50]
  light: "#80cbc4", //[200]
  main: "#26a69a", //[400]
  dark: "#00897b", //[600]
  darker: "#004d40", //[900]
  contrastText: "#fff",
  tableHeader: "#E0F2F1",
};

const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
};

const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#139a21",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#fff",
};

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: "#fff",
};

const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#d32f2f",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const adminPalette = {
  common: { black: "#000", white: "#fff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[400], 0.24),
  text: {
    primary: "#000",
    secondary: GREY[700],
    disabled: GREY[500],
  },
  background: {
    paper: "#fff",
    default: GREY[200],
    neutral: GREY[100],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default adminPalette;
