import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./TopHeader";
import Nav from "./NavBar";
import Footer from "./Footer";
import { Box, Typography } from "@mui/material";
import DynamicBreadCrumbs from "../../components/DynamicBreadCrumbs";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;
const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
  paddingTop: APP_BAR_DESKTOP + 10,
  [theme.breakpoints.up("md")]: {
    paddingTop: APP_BAR_DESKTOP + 10,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: APP_BAR_MOBILE,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <LayoutRoot>
        <LayoutContainer>
          {location?.pathname?.includes("/home") && (
            <Box
              sx={{
                textAlign: "right",
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: "800",
                  fontSize: "11px",
                  padding: "2px 8px",
                }}
              >
                By using the TREX platform, you agree to be bound by the{" "}
                <span
                  onClick={() => {
                    window.open("/terms-and-conditions");
                  }}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    fontStyle: "italic",
                    textDecoration: "underline",
                  }}
                >
                  Terms of Use.
                </span>
              </Typography>
            </Box>
          )}

          <Box my={0.75} sx={{ display: { xs: "none", md: "block" } }}>
            <DynamicBreadCrumbs />
          </Box>

          <Box minHeight="600px">
            <Outlet />
          </Box>
          <Box sx={{ mt: { xs: "2rem", sm: "5rem" } }}>
            <Footer />
          </Box>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};

export default DashboardLayout;
