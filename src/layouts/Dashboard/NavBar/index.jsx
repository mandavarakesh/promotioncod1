import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import { useResponsive } from "../../../hooks/useResponsive";
import Scrollbar from "../../../components/Scrollbar";
import NavSection from "../../../components/NavSection";
import TrexOperatorLogo from "../../../assets/Logos/trexOperatorLogo.svg";
import TrexMerchantLogo from "../../../assets/Logos/trexMerchantLogo.svg";
import { useAppSelector } from "../../../redux/redux-hooks";
import getNavList from "./getNavList";
import { NAV_BAR_WIDTH } from "../../../constants";
import {ROLE_TYPE as RoleTypes} from '../../../constants';

const Nav = ({ openNav, onCloseNav }) => {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const isDesktop = useResponsive("up", "lg");
  const isAdmin = user?.roleType === RoleTypes.ADMIN;

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <NavSection data={getNavList(user)} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  const renderLogo = (
    <Box sx={{ px: 2.5, display: "flex", justifyContent: "center" }}>
      <img
        src={isAdmin ? TrexOperatorLogo : TrexMerchantLogo}
        width="70%"
        alt="TREX"
      />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_BAR_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            variant: "outlined",
            sx: {
              width: NAV_BAR_WIDTH,
              bgcolor: "background.paper",
              borderTop: "none",
            },
          }}
        >
          {renderLogo}
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_BAR_WIDTH },
          }}
        >
          {renderLogo}
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Nav;
