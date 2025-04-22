import { Security } from "@okta/okta-react";
import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import config from "./config";
import {
  storeDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/persistentData";

const oktaAuth = new OktaAuth(config.oidc);

oktaAuth.tokenManager.on(
  "renewed",
  function (myAccessToken, newToken, oldToken) {
    storeDataToLocalStorage("trex-okta-authstate", {
      ...getDataFromLocalStorage("okta-token-storage"),
      isAuthenticated: true,
    });
  }
);

const OktaAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  const restoreOriginalUri = useCallback((_, originalUri = "/") => {
    const url = toRelativeUrl(originalUri, window.location.origin);
    navigateRef.current(url);
  }, []);

  useEffect(() => {
    return () => {
      oktaAuth.options.restoreOriginalUri = undefined;
    };
  }, []);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

export default OktaAuthProvider;
