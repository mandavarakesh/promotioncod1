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
      userid: "d553be4a-61b4-4e9a-9f78-fde278819c71",
      name: null,
      email: "operatornawazpk@yopmail.com",
      mobile: null,
      roleType: 0,
      defaultShop: 0,
      status: "ACTIVE",
      lastLoginDate: "2024-02-27T22:48:17",
      lastUpdateDate: "2024-02-26T13:00:19",
      createDate: "2024-02-26T12:57:22",
      lastUpdatedBy: "operatormahesh@yopmail.com",
      linkedMerchants: null,
      operatorRoles: [
        {
          opAdministrationAccess: {
            viewUserManagementSubModule: "Y",
            addNewOperatorUsers: "Y",
            exportListOfAllUsers: "Y",
            deactivateOperators: "Y",
            deactivateMerchants: "Y",
            viewPlatformActivitySubModule: "Y",
            editOperatorRolesAndPermission: "Y",
            editMerchantRolesAndPermission: "Y",
          },
          opDataInsightsAccess: {
            viewDashboard: "Y",
            exportSalesReport: "Y",
            exportInventoryReport: "Y",
            exportOrderReport: "Y",
            exportGiroReport: "Y",
            exportEncryptedGiro: "Y",
            exportVoucherUsageReport: "Y",
          },
          opMerchantManagementAccess: {
            merchantInvite: "Y",
            businessApprove: "Y",
            financeApprove: "Y",
            leasingApprove: "Y",
            merchantApprove: "Y",
            suspendOrLiveMerchant: "Y",
            viewMerchantAccountInfo: "Y",
            editMerchantBusinessInfo: "Y",
            editMerchantFinanceInfo: "Y",
            editMerchantLeaseInfo: "Y",
            editMerchantLogisticsInfo: "Y",
            exportMerchantInfo: "Y",
            viewPendingApproval: "Y",
          },
          opOrderAccess: {
            viewAllOrders: "Y",
            editAllOrders: "Y",
            exportOrders: "Y",
            viewReturns: "Y",
            manageReturns: "Y",
            manageRefunds: "Y",
          },
          opProductAccess: {
            viewAllProducts: "Y",
            editAllProducts: "Y",
            deactivateProducts: "Y",
            deleteProducts: "Y",
            exportProducts: "Y",
            approveRejectProducts: "Y",
          },
          roleId: "86103e1d-d233-43b6-abc4-71930ed14e73",
          roleType: 0,
          status: "ACTIVE",
          name: "PK Roles",
          merchantId: 0,
          lastUpdatedBy: "operatormahesh@yopmail.com",
          lastUpdateDate: "2024-02-26T12:57:17",
          isDefault: false,
          createDate: "2024-02-26T12:57:17",
        },
      ],
      merchantRoles: null,
      merchantIds: [0],
      roleIdList: ["86103e1d-d233-43b6-abc4-71930ed14e73"],
    },
    selectedRole: {
      role: {
        roleId: "82e3688a-e48c-4c66-bd3f-88cc202a975d",
        name: "Admin",
        status: "ACTIVE",
        lastUpdateDate: "12-02-2023T00:00:000",
        roleName: "role1",
        shop: "shop1",
        userEmail: "phani@gmail.com",
        merProductAccess: {},
        merOrderAccess: {},
        merMyAccountAccess: {},
        merDataInsightsAccess: {},
      },
    },
    currentShop: { merchantName: "merchant123" },
  },
 
};
const store = mockStore(initialState);

const TestHelperOp = (component) => {
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

export default TestHelperOp;
