import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { getDataFromLocalStorage } from "../../utils/persistentData";
import { useAppSelector } from "../../redux/redux-hooks";

const StyledBreadcrumb = styled(Breadcrumbs)(({ theme }) => {
  return {
    a: {
      fontSize: "12px",
      color: theme.palette.grey[700],
      textDecoration: "none",
      "&:hover, &:focus": {
        textDecoration: "underline",
      },
      "&:active": {
        textDecoration: "none",
        fontWeight: "700",
      },
      "&.active": {
        textDecoration: "none",
        fontWeight: "700",
      },
    },
  };
});

const urlNeedsModification = {
  createMerPage: "/administration/user-management/admin-edit-merchant-user",
  shopInfoPage: "/my-account/shop-information",
  userMangPage: "/administration/user-management",
};

const DynamicBreadCrumbs = () => {
  const { breadcrumbModifiers } = useAppSelector((state) => state.user);
  const user = getDataFromLocalStorage("current_user_data");
  const isAdmin = user?.roleType === 0;
  const location = useLocation();
  const pathName = location.pathname;
  const { id } = useParams();
  const urlSegments = pathName.split("/");
  const idIndex = urlSegments.indexOf(id);

  const capitalizeSegment = (segment) => {
    return segment.charAt(0).toUpperCase() + segment.substring(1);
  };

  function formatBreadcrumbLabel(label) {
    let modifiedLabel = label;
    if (label.includes("administration_mer")) {
      modifiedLabel = modifiedLabel.replace("_mer", "");
    }
    const segments = modifiedLabel.split("-");
    const formattedSegments = segments.map(capitalizeSegment).join(" ");

    if (label === "order") {
      const idSegments = id.split("-");
      const formattedIdSegments = idSegments.map(capitalizeSegment).join(" ");
      return `${formattedSegments} ${formattedIdSegments}`;
    }

    return formattedSegments;
  }

  function createBreadcrumbItem(segment, index, currentPath) {
    if (index === 0) {
      return { label: "Dashboard", url: "/home" };
    }
    if (location.pathname === "/home") return;
    const url = `${currentPath}/${segment}`;
    return id === segment
      ? null
      : { label: formatBreadcrumbLabel(segment), url };
  }

  let breadCrumbs = urlSegments
    .map((segment, index) =>
      createBreadcrumbItem(
        segment,
        index,
        urlSegments.slice(0, index).join("/")
      )
    )
    .filter(Boolean)
    .map((item, index) =>
      index === idIndex - 1 ? { ...item, url: `${item.url}/${id}` } : item
    );

  if (
    pathName === urlNeedsModification.shopInfoPage ||
    pathName === `/merchant-management/all-merchants/${id}`
  ) {
    let shopId = id;
    if (!isAdmin) {
      shopId = user.defaultShop;
    }
    const merIdBreadCrumb = {
      label: `Merchant ID: ${shopId}`,
      url: "/merchantId",
    };
    breadCrumbs.push(merIdBreadCrumb);
  }

  if (!!breadcrumbModifiers?.id) {
    breadCrumbs = breadCrumbs.map((item) => {
      if (item.url === urlNeedsModification.createMerPage) {
        return { ...item, url: `${item.url}/${breadcrumbModifiers.id}` };
      }
      return item;
    });
  }

  if (!!breadcrumbModifiers?.searchParams) {
    breadCrumbs = breadCrumbs.map((item) => {
      if (item.url === urlNeedsModification.userMangPage) {
        return { ...item, url: item.url + breadcrumbModifiers.searchParams };
      }
      return item;
    });
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {breadCrumbs.map((item, index) => {
        if (index !== breadCrumbs.length - 1) {
          return (
            <StyledBreadcrumb key={item.label}>
              <NavLink to={item.url}>
                <Typography
                  fontWeight={700}
                  variant="caption"
                  sx={{ display: "flex !important" }}
                >
                  {item.label}
                </Typography>
              </NavLink>
            </StyledBreadcrumb>
          );
        } else {
          return (
            <StyledBreadcrumb sx={{ cursor: "not-allowed" }} key={item.label}>
              <Typography
                fontWeight={700}
                variant="caption"
                sx={{ display: "flex !important" }}
              >
                {item.label}
              </Typography>
            </StyledBreadcrumb>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default DynamicBreadCrumbs;
