import React from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

jest.mock("jose", () => ({
  __esModule: true,
  decodeJwt: jest.fn().mockImplementation(() => {
    return {
      sub: "12345",
    };
  }),
}));

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: jest.fn().mockReturnValue({
    oktaAuth: {
      token: { renewTokens: jest.fn() },
      tokenManager: { setTokens: jest.fn() },
    },
  }),
}));


jest.mock("@okta/okta-react");
jest.mock("./auth/OktaAuthProvider", () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="mock-okta-auth-provider">{children}</div>
    ),
  };
});

jest.mock("amazon-cognito-identity-js", () => ({
  __esModule: true,
  CognitoUserPool: jest.fn().mockImplementation(() => {
    return {
      getCurrentUser: jest.fn(),
    };
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 5000,
    },
  },
});

window.scrollTo = jest.fn();

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

test("App renders without errors", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
});
