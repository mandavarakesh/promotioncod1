import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountPopover from "./AccountPopover";
import { HEADER_WIDTH, NAV_BAR_WIDTH } from "../../../constants";

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "2",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_BAR_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_WIDTH,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_WIDTH,
    padding: theme.spacing(0, 3),
  },
}));

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
          data-testid="open-nav"
        >
          <MenuIcon color="action" fontSize="medium" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 2,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
