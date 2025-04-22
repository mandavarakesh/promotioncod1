import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { toRelativeUrl } from "@okta/okta-auth-js";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  getDataFromLocalStorage,
  removeKeyFromLocalStorage,
  storeDataToLocalStorage,
} from "../utils/persistentData";
import { useGraphQLMutation } from "../hooks/useGraphQLMutation";
import { GET_USER_BY_EMAIL } from "../graphql/queries";
import { useAppDispatch } from "../redux/redux-hooks";
import { setUser } from "../redux/userSlice";
import { ROLE_TYPE } from "../constants";
import { useNavigate } from "react-router-dom";

const defaultMsg =
  "Unable to fetch the user details, Please click on back to dashboard to navigate to okta dashboard";

export const RequiredAuth = () => {
  const [open, setOpen] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserData = getDataFromLocalStorage("current_user_data");

  const { mutate } = useGraphQLMutation(GET_USER_BY_EMAIL);

  const trexOktaAuthState = getDataFromLocalStorage("trex-okta-authstate");
  const operatorRoleStatus = currentUserData?.operatorRoles?.[0]?.status;
  const merchantRoleStatus = currentUserData?.merchantRoles?.find(
    (item) => item.merchantId === currentUserData?.defaultShop
  )?.status;

  const getRoleStatus = () => {
    if (
      currentUserData?.roleType === ROLE_TYPE.ADMIN &&
      currentUserData?.operatorRoles
    ) {
      operatorRoleStatus === "INACTIVE" && !open ? setOpen(true) : null;
      return operatorRoleStatus;
    }
    if (
      currentUserData?.roleType === ROLE_TYPE.MERCHANT &&
      currentUserData?.merchantRoles
    ) {
      merchantRoleStatus === "INACTIVE" && !open ? setOpen(true) : null;
      return merchantRoleStatus;
    }
    return currentUserData ? "INACTIVE" : null;
  };
  const isUserRoleActive = getRoleStatus();

  const handleErrorMessage = () => {
    if (isUserRoleActive === "ACTIVE") {
      return errorMsg;
    } else if (isUserRoleActive === "INACTIVE") {
      return "Your user role is currently inactive, so you are unable to sign in. Please contact the administrator for further assistance.";
    } else {
      return errorMsg;
    }
  };

  const onSuccess = (response) => {
    const { code, data, message } = response?.getUserByEmail;
    if (code === 200 && data) {
      dispatch(setUser(data));
      storeDataToLocalStorage("current_user_data", data);
    } else {
      setOpen(true);
      setErrorMsg(message ?? defaultMsg);
    }
  };

  const onError = (e) => console.log("x =", e);
  const handleClose = () => navigate("/slo/logout");
  if (!trexOktaAuthState && authState?.isAuthenticated) {
    try {
      const userVariable = {
        email: JSON.stringify({ email: authState.idToken.claims.email }),
      };
      // authState.idToken.claims.email
      mutate(userVariable, { onSuccess, onError });
    } catch (e) {
      console.log("error =", e);
    }
  }
  useEffect(() => {
    if (!authState) {
      return;
    }
    if (!authState?.isAuthenticated) {
      removeKeyFromLocalStorage("trex-okta-authstate");
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
    if (trexOktaAuthState?.idToken?.claims?.email !== currentUserData?.email) {
      removeKeyFromLocalStorage("trex-okta-authstate");
      removeKeyFromLocalStorage("current_user_data");
      mutate(
        { email: JSON.stringify({ email: authState?.idToken?.claims?.email }) },
        { onSuccess, onError }
      );
    }
    if (authState?.isAuthenticated) {
      storeDataToLocalStorage("trex-okta-authstate", authState);
      dispatch(setUser(currentUserData));
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);
  if (!authState || !authState?.isAuthenticated) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress data-testid="progressbar" color="inherit" />
      </Backdrop>
    );
  }
  if (open) {
    if (!currentUserData || isUserRoleActive === "INACTIVE") {
      return (
        <Dialog open={open}>
          <DialogTitle>Access Denied</DialogTitle>
          <DialogContent>{handleErrorMessage()}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Back to Dashboard</Button>
          </DialogActions>
        </Dialog>
      );
    }
  }

  return currentUserData ? <DashboardLayout /> : null;
};
