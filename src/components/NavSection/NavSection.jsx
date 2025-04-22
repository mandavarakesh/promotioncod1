import { NavLink, useLocation, useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
//
import { Fragment, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const StyledDiv = styled("div")(({ theme }) => ({
  ".active": {
    background: theme.palette.primary.lighter,
    color: "#000",
    display: "block",
    span: {
      fontWeight: "700",
    },
  },
}));

const NavSection = ({ data = [], ...other }) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (index, to) => {
    if (to) return navigate(to);
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    const activeIndex = data.findIndex((item) => {
      if (item.nestedItems) {
        return item.nestedItems.some((nestedItem) => {
          const [tabUrl] = nestedItem?.to?.split("?") ?? [];
          const [, urlPart1, urlPart2] = pathname?.split("/") ?? [];
          const currentUrl = `/${urlPart1}/${urlPart2}`;
          return tabUrl === currentUrl;
        });
      }
      return false;
    });
    setOpenIndex(activeIndex);
  }, [data, pathname]);

  return (
    <Box {...other}>
      <List disablePadding>
        {data.map((item, index) => (
          <Fragment key={`nav-section-${index}`}>
            <ListItemButton onClick={() => handleClick(index, item?.to)}>
              <ListItemIcon sx={{ minWidth: "2rem" }}>
                {item.icon()}
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {item.nestedItems &&
                (openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItemButton>
            {item.nestedItems && (
              <Collapse in={openIndex === index} unmountOnExit>
                <List sx={{ px: "0.5rem" }} component="div" disablePadding>
                  {item.nestedItems.map((nestedItem, nestedIndex) => {
                    return (
                      <StyledDiv key={nestedIndex}>
                        <NavLink to={nestedItem.to}>
                          <ListItemButton sx={{ pl: "2.5rem", py: "0" }}>
                            <ListItemText primary={nestedItem.title} />
                          </ListItemButton>
                        </NavLink>
                      </StyledDiv>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
