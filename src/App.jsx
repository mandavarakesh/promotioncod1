import React, { useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import ThemeProvider from "./theme";
import "./App.css";
import ScrollToTop from "./components/ScrolToTop";
import Router from "./Router";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider } from "./pages/Promotions/SnackbarProvider";

const App = () => {
  const navigate = useNavigate();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
            staleTime: 5000,
          },
        },
        queryCache: new QueryCache({
          onSuccess: (data) => {
            if(data[Object.keys(data)]?.code === 401) {
              navigate("/unauthorized")
            }
          },
          // onError: async (error) => {
          //   if (
          //     error.response?.status === 401 ||
          //     error.response?.status === 400
          //   ) {
          //     try {
          //       const renewedToken = await oktaAuth.token.renewTokens();
          //       oktaAuth.tokenManager.setTokens(renewedToken);
          //       storeDataToLocalStorage("trex-okta-authstate", {
          //         ...renewedToken,
          //         isAuthenticated: true,
          //       });
          //     } catch (renewalError) {
          //       navigate("/logout");
          //     }
          //   }
          // },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
      <ThemeProvider>
        <ScrollToTop />
        <Router />
      </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
