import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import adminPalette from "./adminPalette";
import merchantPalette from "./merchantPalette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import componentsOverride from "./Overrides";
import { useAppSelector } from "../redux/redux-hooks";
import { ROLE_TYPE as RoleTypes } from "../constants";

// ----------------------------------------------------------------------

const ThemeProvider = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);
  const themeOptions = useMemo(
    () => ({
      palette:
        user?.roleType === RoleTypes.ADMIN ? adminPalette : merchantPalette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [user]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
