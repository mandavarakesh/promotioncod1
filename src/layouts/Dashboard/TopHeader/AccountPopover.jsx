import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
  ListItemButton,
  Collapse,
  List,
  Tooltip,
} from "@mui/material";
import { useAppDispatch } from "../../../redux/redux-hooks";
import { setUser } from "../../../redux/userSlice";
import { stringAvatar } from "../../../utils/userManagement";
import {
  getDataFromLocalStorage,
  storeDataToLocalStorage,
} from "../../../utils/persistentData";
import { useQueryClient } from "@tanstack/react-query";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { isAdminOrMerchant } from "../../../utils/isAdminOrMerchant";
import { useGraphQLMutation } from "../../../hooks/useGraphQLMutation";
import { UPDATE_USER } from "../../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import CustomSnackBar from "../../../components/CustomSnackBar";

const AccountPopover = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [expandShopDetails, setExpandShopDetails] = useState(false);

  const userData = getDataFromLocalStorage("current_user_data");
  const roleType = isAdminOrMerchant();
  const { mutate: updateUser } = useGraphQLMutation(UPDATE_USER);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => navigate("/slo/logout");

  const handleShopAccess = (merchantId) => {
    if (merchantId !== userData?.defaultShop) {
      const actionVariables = {
        updateUserData: JSON.stringify({
          defaultShop: merchantId,
          email: userData?.email,
        }),
        currentUserEmail: JSON.stringify({ currentUserEmail: userData?.email }),
      };
      updateUser(actionVariables, {
        onSuccess: (response) => {
          const { code, data } = response?.ecsUpdateUser;
          if (code === 200 && data) {
            queryClient.removeQueries();
            storeDataToLocalStorage("current_user_data", data);
            dispatch(setUser(data));
            navigate("/");
          } else {
            setSnackbarOpen(true);
          }
        },
      });
    }
  };

  const ConditionalExpandIcon = () => {
    if (expandShopDetails) {
      return <ExpandLess />;
    }
    return <ExpandMore />;
  };
  const ListLinkedMerchant = () => {
    if (userData?.linkedMerchants?.length > 0) {
      return (
        <List component="div" disablePadding>
          {userData?.linkedMerchants?.map((data) => {
            return (
              <ListItemButton
                key={`linked-merchant-${data?.merchantId}`}
                sx={{
                  pl: 4,
                  background: "theme.palette.primary.lighter",
                }}
                selected={data?.merchantId === userData?.defaultShop}
                disabled={data?.status === "INACTIVE"}
                onClick={() => handleShopAccess(data?.merchantId)}
              >
                <Tooltip title={`${data?.merchantName} (${data?.status})`}>
                  <Typography
                    variant="caption"
                    children={`${data?.merchantName} (${data?.status})`}
                    noWrap
                  />
                </Tooltip>
              </ListItemButton>
            );
          })}
        </List>
      );
    }
    return (
      <Typography sx={{ pl: 5 }} variant="caption">
        No Shops Assigned
      </Typography>
    );
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar {...stringAvatar(userData?.name ?? userData?.email)} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              p: 0,
              mt: 1.5,
              ml: 0.75,
              width: 200,
              "& .MuiMenuItem-root": {
                typography: "body2",
                borderRadius: 0.75,
              },
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userData?.name ?? "Trex user"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userData?.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "solid" }} />
        {roleType === "MERCHANT" ? (
          <>
            <ListItemButton
              onClick={() => setExpandShopDetails(!expandShopDetails)}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="subtitle2" sx={{ px: 0.5 }}>
                Shop Access
              </Typography>
              <ConditionalExpandIcon />
            </ListItemButton>
            <Collapse in={expandShopDetails} timeout="auto" unmountOnExit>
              <ListLinkedMerchant />
            </Collapse>
          </>
        ) : null}
        <Divider sx={{ borderStyle: "solid" }} />
        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
      <CustomSnackBar
        open={snackbarOpen}
        message="Server Error, Unable to switch to the selected shop"
        isErrorMsg={true}
      />
    </>
  );
};

export default AccountPopover;
