import React from "react";
import ThemeProvider from "./theme";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import OktaAuthProvider from "./auth/OktaAuthProvider";
 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === "test" ? jest.fn() : console.error,
  },
});
 
const middlewares = [];
const mockStore = configureStore(middlewares);
 
const initialState = {
  user: {
    user: {
      userid: "729e454b-137c-44c3-9c38-d13c063904e2",
      name: "phani",
      email: "phani@gmail.com",
      mobile: null,
      roleType: 1,
      defaultShop: 2047,
      status: "INVITED",
      lastLoginDate: null,
      lastUpdateDate: "2023-07-12T20:05:53",
      createDate: "2023-07-12T18:07:40",
      lastUpdatedBy: "satish.kumar@changiairport.com",
      merchantIds: [2047],
      roleIdList: ["1f3ccacc-dd3e-42f2-aaec-a580d16e93d5"],
      merchantRoles: [
        {
          roleId: "1f3ccacc-dd3e-42f2-aaec-a580d16e93d5",
          merchantId: 2047,
          name: "thor",
          status: "ACTIVE",
          lastUpdateDate: "2023-07-12T12:05:52",
          createDate: "2023-07-12T12:05:52",
          isDefault: false,
          lastUpdatedBy: "satish.kumar@changiairport.com",
          roleType: 1,
          merDataInsightsAccess: {
            viewDashboard: "Y",
            exportSalesReport: "Y",
            exportInventoryReport: "Y",
            exportOrderReport: "Y",
            exportGiroReport: "Y",
          },
          merMyAccountAccess: {
            addNewUsers: "Y",
            editUserRoles: "Y",
            createNewRoles: "Y",
            viewBusinessInfo: "Y",
            editBusinessInfo: "Y",
            viewFinanceInfo: "Y",
            editFinanceInfo: "Y",
            editLeaseInfo: "Y",
            viewLeaseInfo: "Y",
            viewLogisticsInfo: "Y",
          },
          merOrderAccess: {
            viewOrders: "Y",
            editOrders: "Y",
            exportOrders: "Y",
            viewReturns: "Y",
          },
          merProductAccess: {
            viewProducts: "Y",
            addAndEditProducts: "Y",
            deactivateProducts: "Y",
            deleteProducts: "Y",
            exportProducts: "Y",
          },
        },
      ],
      operatorRoles: null,
    },
  },
};
const store = mockStore(initialState);
 
const TestHelper = (component) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OktaAuthProvider>
            <ThemeProvider>{component}</ThemeProvider>
          </OktaAuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
};
 
export default TestHelper;
