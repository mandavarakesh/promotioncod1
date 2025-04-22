import { render, screen } from "@testing-library/react";
import { RequiredAuth } from "./SecureRoute";
import { useOktaAuth } from "@okta/okta-react";
import TestHelper from "../TestHelper";
import { getDataFromLocalStorage } from "../utils/persistentData";

jest.mock("@okta/okta-react", () => {
  return {
    ...jest.requireActual("@okta/okta-react"),
    useOktaAuth: jest.fn(),
  };
});

jest.mock("../utils/persistentData", () => ({
  __esModule: true,
  ...jest.requireActual("../utils/persistentData"),
  getDataFromLocalStorage: jest.fn()
}))

jest.mock("@okta/okta-react");
jest.mock("../auth/OktaAuthProvider.jsx", () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="mock-okta-auth-provider">{children}</div>
    ),
  };
});

const mockMutation = jest.fn();

jest.mock("../hooks/useGraphQLMutation", () => ({
  useGraphQLMutation: jest.fn().mockImplementation((_mutation) => {
    return {
      mutate: mockMutation,
      isLoading: false,
    };
  }),
}));
describe("SecureRoute", () => {
  test("should render loader if user not authenticated", () => {
    useOktaAuth.mockReturnValue({
      oktaAuth: {
        setOriginalUri: jest.fn(),
        signInWithRedirect: jest.fn(),
        getAccessToken: jest.fn().mockReturnValue(true),
      },
      authState: { isAuthenticated: false },
    });
    getDataFromLocalStorage.mockReturnValue({ isAuthenticated: false });
    render(TestHelper(<RequiredAuth />));
    expect(screen.getByTestId("progressbar")).toBeVisible();
  });

  test("should render loader if authstate is not defined", () => {
    useOktaAuth.mockReturnValue({
      oktaAuth: {
        setOriginalUri: jest.fn(),
        signInWithRedirect: jest.fn(),
        getAccessToken: jest.fn().mockReturnValue(true),
      },
    });
    render(TestHelper(<RequiredAuth>outlet</RequiredAuth>));
    expect(screen.getByTestId("progressbar")).toBeVisible();
  });
  test("renders DashboardLayout when authenticated", () => {
    useOktaAuth.mockReturnValue({
      oktaAuth: {},
      authState: {
        isAuthenticated: true,
      },

      
    });
    getDataFromLocalStorage.mockReturnValue({ 
      isAuthenticated: true,
      roleType: 0,
      operatorRoles: [{ status: "ACTIVE" }]
     });
    render(TestHelper(<RequiredAuth />));
    expect(screen.getAllByText("Dashboard")[0]).toBeInTheDocument();
  });


  test("renders DashboardLayout when authenticated and with status INACTIVE", () => {
    useOktaAuth.mockReturnValue({
      oktaAuth: {},
      authState: { isAuthenticated: true },
    });
    getDataFromLocalStorage.mockReturnValue({
      "userid": "d553be4a-61b4-4e9a-9f78-fde278819c71",
      "name": "operatornawazpk",
      "email": "operatornawazpk@yopmail.com",
      "mobile": null,
      "roleType": 0,
      "defaultShop": 0,
      "status": "ACTIVE",
      "lastLoginDate": "2024-03-27T11:40:08",
      "lastUpdateDate": "2024-03-22T14:14:33",
      "createDate": "2024-02-26T12:57:22",
      "lastUpdatedBy": "trex-chaitanya-operator@yopmail.com",
      "linkedMerchants": null,
      "operatorRoles": [
          {
              "opAdministrationAccess": {
                  "viewUserManagementSubModule": "Y",
                  "addNewOperatorUsers": "Y",
                  "exportListOfAllUsers": "Y",
                  "deactivateOperators": "Y",
                  "deactivateMerchants": "Y",
                  "viewPlatformActivitySubModule": "Y",
                  "editOperatorRolesAndPermission": "Y",
                  "editMerchantRolesAndPermission": "Y"
              },
              "opDataInsightsAccess": {
                  "viewDashboard": "Y",
                  "exportSalesReport": "Y",
                  "exportInventoryReport": "Y",
                  "exportOrderReport": "Y",
                  "exportGiroReport": "Y",
                  "exportEncryptedGiro": "Y",
                  "exportVoucherUsageReport": "Y"
              },
              "opMerchantManagementAccess": {
                  "merchantInvite": "Y",
                  "businessApprove": "Y",
                  "financeApprove": "Y",
                  "leasingApprove": "Y",
                  "merchantApprove": "Y",
                  "suspendOrLiveMerchant": "Y",
                  "viewMerchantAccountInfo": "Y",
                  "editMerchantBusinessInfo": "Y",
                  "editMerchantFinanceInfo": "Y",
                  "editMerchantLeaseInfo": "Y",
                  "editMerchantLogisticsInfo": "Y",
                  "exportMerchantInfo": "Y",
                  "viewPendingApproval": "Y"
              },
              "opOrderAccess": {
                  "viewAllOrders": "Y",
                  "editAllOrders": "Y",
                  "exportOrders": "Y",
                  "viewReturns": "Y",
                  "manageReturns": "Y",
                  "manageRefunds": "Y"
              },
              "opProductAccess": {
                  "viewAllProducts": "Y",
                  "editAllProducts": "Y",
                  "deactivateProducts": null,
                  "deleteProducts": null,
                  "exportProducts": "Y",
                  "approveRejectProducts": "Y"
              },
              "roleId": "63e65e2c-5461-432a-bc8f-77c160882275",
              "roleType": 0,
              "status": "INACTIVE",
              "name": "All Updated Permissions",
              "merchantId": 0,
              "lastUpdatedBy": "operatornawazpk@yopmail.com",
              "lastUpdateDate": "2024-03-13T13:29:26",
              "isDefault": false,
              "createDate": "2024-03-13T13:29:26"
          }
      ],
      "merchantRoles": null,
      "merchantIds": [
          0
      ],
      "roleIdList": [
          "63e65e2c-5461-432a-bc8f-77c160882275"
      ],
      isAuthenticated:true

    },
      
    
    
    
    );
    render(TestHelper(<RequiredAuth />));
  });


  test("renders DashboardLayout when not authenticated and with status ACTIVE", () => {
    useOktaAuth.mockReturnValue({
      oktaAuth: {},
      authState: { isAuthenticated: true },
    });
    getDataFromLocalStorage.mockReturnValue({
      "userid": "d553be4a-61b4-4e9a-9f78-fde278819c71",
      "name": "operatornawazpk",
      "email": "operatornawazpk@yopmail.com",
      "mobile": null,
      "roleType": 0,
      "defaultShop": 0,
      "status": "ACTIVE",
      "lastLoginDate": "2024-03-27T11:40:08",
      "lastUpdateDate": "2024-03-22T14:14:33",
      "createDate": "2024-02-26T12:57:22",
      "lastUpdatedBy": "trex-chaitanya-operator@yopmail.com",
      "linkedMerchants": null,
      "operatorRoles": [
          {
              "opAdministrationAccess": {
                  "viewUserManagementSubModule": "Y",
                  "addNewOperatorUsers": "Y",
                  "exportListOfAllUsers": "Y",
                  "deactivateOperators": "Y",
                  "deactivateMerchants": "Y",
                  "viewPlatformActivitySubModule": "Y",
                  "editOperatorRolesAndPermission": "Y",
                  "editMerchantRolesAndPermission": "Y"
              },
              "opDataInsightsAccess": {
                  "viewDashboard": "Y",
                  "exportSalesReport": "Y",
                  "exportInventoryReport": "Y",
                  "exportOrderReport": "Y",
                  "exportGiroReport": "Y",
                  "exportEncryptedGiro": "Y",
                  "exportVoucherUsageReport": "Y"
              },
              "opMerchantManagementAccess": {
                  "merchantInvite": "Y",
                  "businessApprove": "Y",
                  "financeApprove": "Y",
                  "leasingApprove": "Y",
                  "merchantApprove": "Y",
                  "suspendOrLiveMerchant": "Y",
                  "viewMerchantAccountInfo": "Y",
                  "editMerchantBusinessInfo": "Y",
                  "editMerchantFinanceInfo": "Y",
                  "editMerchantLeaseInfo": "Y",
                  "editMerchantLogisticsInfo": "Y",
                  "exportMerchantInfo": "Y",
                  "viewPendingApproval": "Y"
              },
              "opOrderAccess": {
                  "viewAllOrders": "Y",
                  "editAllOrders": "Y",
                  "exportOrders": "Y",
                  "viewReturns": "Y",
                  "manageReturns": "Y",
                  "manageRefunds": "Y"
              },
              "opProductAccess": {
                  "viewAllProducts": "Y",
                  "editAllProducts": "Y",
                  "deactivateProducts": null,
                  "deleteProducts": null,
                  "exportProducts": "Y",
                  "approveRejectProducts": "Y"
              },
              "roleId": "63e65e2c-5461-432a-bc8f-77c160882275",
              "roleType": 0,
              "status": "ACTIVE",
              "name": "All Updated Permissions",
              "merchantId": 0,
              "lastUpdatedBy": "operatornawazpk@yopmail.com",
              "lastUpdateDate": "2024-03-13T13:29:26",
              "isDefault": false,
              "createDate": "2024-03-13T13:29:26"
          }
      ],
      "merchantRoles": null,
      "merchantIds": [
          0
      ],
      "roleIdList": [
          "63e65e2c-5461-432a-bc8f-77c160882275"
      ],
      isAuthenticated:false

    },
      
    
    
    
    );
    render(TestHelper(<RequiredAuth />));
  });

  test(" when authenticated and make mutation call", () => {


    mockMutation
    .mockImplementationOnce((_variables, options) => {
      const { onSuccess } = options;
      const response = {
        getUserByEmail: {
          data:{
            "userid": "d553be4a-61b4-4e9a-9f78-fde278819c71",
            "name": "operatornawazpk",
            "email": "operatornawazpk@yopmail.com",
            "mobile": null,
            "roleType": 0,
            "defaultShop": 0,
            "status": "ACTIVE",
            "lastLoginDate": "2024-03-27T11:40:08",
            "lastUpdateDate": "2024-03-22T14:14:33",
            "createDate": "2024-02-26T12:57:22",
            "lastUpdatedBy": "trex-chaitanya-operator@yopmail.com",
            "linkedMerchants": null,
            "operatorRoles": [
                {
                    "opAdministrationAccess": {
                        "viewUserManagementSubModule": "Y",
                        "addNewOperatorUsers": "Y",
                        "exportListOfAllUsers": "Y",
                        "deactivateOperators": "Y",
                        "deactivateMerchants": "Y",
                        "viewPlatformActivitySubModule": "Y",
                        "editOperatorRolesAndPermission": "Y",
                        "editMerchantRolesAndPermission": "Y"
                    },
                    "opDataInsightsAccess": {
                        "viewDashboard": "Y",
                        "exportSalesReport": "Y",
                        "exportInventoryReport": "Y",
                        "exportOrderReport": "Y",
                        "exportGiroReport": "Y",
                        "exportEncryptedGiro": "Y",
                        "exportVoucherUsageReport": "Y"
                    },
                    "opMerchantManagementAccess": {
                        "merchantInvite": "Y",
                        "businessApprove": "Y",
                        "financeApprove": "Y",
                        "leasingApprove": "Y",
                        "merchantApprove": "Y",
                        "suspendOrLiveMerchant": "Y",
                        "viewMerchantAccountInfo": "Y",
                        "editMerchantBusinessInfo": "Y",
                        "editMerchantFinanceInfo": "Y",
                        "editMerchantLeaseInfo": "Y",
                        "editMerchantLogisticsInfo": "Y",
                        "exportMerchantInfo": "Y",
                        "viewPendingApproval": "Y"
                    },
                    "opOrderAccess": {
                        "viewAllOrders": "Y",
                        "editAllOrders": "Y",
                        "exportOrders": "Y",
                        "viewReturns": "Y",
                        "manageReturns": "Y",
                        "manageRefunds": "Y"
                    },
                    "opProductAccess": {
                        "viewAllProducts": "Y",
                        "editAllProducts": "Y",
                        "deactivateProducts": null,
                        "deleteProducts": null,
                        "exportProducts": "Y",
                        "approveRejectProducts": "Y"
                    },
                    "roleId": "63e65e2c-5461-432a-bc8f-77c160882275",
                    "roleType": 0,
                    "status": "ACTIVE",
                    "name": "All Updated Permissions",
                    "merchantId": 0,
                    "lastUpdatedBy": "operatornawazpk@yopmail.com",
                    "lastUpdateDate": "2024-03-13T13:29:26",
                    "isDefault": false,
                    "createDate": "2024-03-13T13:29:26"
                }
            ],
            "merchantRoles": null,
            "merchantIds": [
                0
            ],
            "roleIdList": [
                "63e65e2c-5461-432a-bc8f-77c160882275"
            ]
        },
          code: 200,
          message: "success",
        },
      };
      onSuccess(response);
    })

    useOktaAuth.mockReturnValue({
      oktaAuth: {},
      authState: {
        isAuthenticated: true,
    
        idToken: {
          
          claims: {
            email:""
          }
        }},
    });
    getDataFromLocalStorage.mockReturnValue(null);


   
    render(TestHelper(<RequiredAuth />));
  });



  test(" when authenticated and make mutation call with error", () => {


    mockMutation
    .mockImplementationOnce((_variables, options) => {
      const { onError } = options;
    
      onError({});
    })
    
    useOktaAuth.mockReturnValue({
      oktaAuth: {},
      authState: {
        isAuthenticated: true,
        idToken: {
          
          claims: {
            email:""
          }
        }
      
      
      },
    });
    getDataFromLocalStorage.mockReturnValue(null);


   
    render(TestHelper(<RequiredAuth />));
  });
});
