import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useAppSelector } from "./redux/redux-hooks";
import { RequiredAuth } from "./auth/SecureRoute";
import { LoginCallback } from "@okta/okta-react";
// import Loading from "./pages/AuthPages/Loading";
import { isAdminOrMerchant } from "./utils/isAdminOrMerchant";
import { ROLE_TYPE as RoleTypes } from "./constants";
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";
import { lazy, Suspense } from "react";
import { ProductsListCart } from "./pages/Promotions/ProductsListCart";
// ----------------------------------------------------------------------

const loadingMsg =
  "You have now been authenticated. Your request has been forwarded to the target system for processing";
const administrationViewPerms = {
  opAdministrationAccess: [
    "addNewOperatorUsers",
    "deactivateMerchants",
    "deactivateOperators",
    "exportListOfAllUsers",
    "viewUserManagementSubModule",
  ],
};
const createMerAccountPerms = {
  opMerchantManagementAccess: ["merchantInvite"],
};
const pendingApprovalViewPerms = {
  opMerchantManagementAccess: ["merchantApprove", "viewPendingApproval"],
};
const merUserManagementPerms = {
  merMyAccountAccess: ["addNewUsers", "editUserRoles", "createNewRoles"],
};
const merAddUserPerms = {
  merMyAccountAccess: ["addNewUsers"],
};
const merAddNewRolePerms = {
  merMyAccountAccess: ["createNewRoles"],
};
const merEditRolePerms = {
  merMyAccountAccess: ["editUserRoles"],
};
const merViewBizInfoPerms = {
  merMyAccountAccess: [
    "viewBusinessInfo",
    "editBusinessInfo",
    "viewFinanceInfo",
    "editFinanceInfo",
    "editLeaseInfo",
    "viewLeaseInfo",
    "viewLogisticsInfo",
  ],
};
const opViewBizInfoPerms = {
  opMerchantManagementAccess: [
    "businessApprove",
    "financeApprove",
    "leasingApprove",
    "suspendOrLiveMerchant",
    "viewMerchantAccountInfo",
    "editMerchantBusinessInfo",
    "editMerchantFinanceInfo",
    "editMerchantLeaseInfo",
    "editMerchantLogisticsInfo",
  ],
};
const opViewBizInfoFromPendingApprovalPerms = {
  opMerchantManagementAccess: [
    "merchantApprove",
    "businessApprove",
    "financeApprove",
    "leasingApprove",
    "suspendOrLiveMerchant",
    "viewMerchantAccountInfo",
    "editMerchantBusinessInfo",
    "editMerchantFinanceInfo",
    "editMerchantLeaseInfo",
    "editMerchantLogisticsInfo",
    "viewPendingApproval",
  ],
};
const opViewAllProductsPerms = {
  opProductAccess: ["viewAllProducts"],
};
const merViewProductPerms = {
  merProductAccess: ["viewProducts"],
};

const merAddAProductPerms = {
  merProductAccess: ["addAndEditProducts"],
};

const merEditProductPerms = {
  merProductAccess: ["addAndEditProducts"],
};

const merBulkProductPerms = {
  merProductAccess: ["addAndEditProducts", "viewProducts"],
};
const opBulkProductPerms = {
  opProductAccess: ["viewAllProducts"],
};
const operatorViewAllOrders = {
  opOrderAccess: ["viewAllOrders"],
};
const merchantViewAllOrders = {
  merOrderAccess: ["viewOrders"],
};
const opEditProductPerms = {
  opProductAccess: ["editAllProducts"],
};

const opEditOperatorRolesPerms = {
  opAdministrationAccess: ["editOperatorRolesAndPermission"],
};

const opEditMerchantRolesPerms = {
  opAdministrationAccess: ["editMerchantRolesAndPermission"],
};
const AllPromotions = lazy(() => import("./pages/Promotions/AllPromotions"));
const Promotions = lazy(() => import("./pages/Promotions"));
const EditPromotions = lazy(() => import("./pages/Promotions/EditPromotions"));

const LoadingFallback = () => (
  <div
    style={{
      textAlign: "center",
      background: "lightGray",
      width: "100%",
      height: "100%",
    }}
  >
    Loading...
  </div>
);

// HOC for route authorization
const withAuthorization = (roleType, permissions) => (Component) => {
  const { user } = useAppSelector((state) => state?.user);
  const isNewMerchantUser =
    user?.roleType === RoleTypes.MERCHANT &&
    (!user?.merchantRoles || user?.merchantRoles?.length <= 0) &&
    user?.status !== "INACTIVE";

  const isUserHasRequiredRole = roleType.includes(user?.roleType);

  if (isNewMerchantUser) {
    return <Navigate to="/my-account/onboarding-form" replace />;
  }

  if (permissions) {
    const hasPermission = userPermissions(user, permissions);
    if (isUserHasRequiredRole && hasPermission) {
      return <Component />;
    }
  } else {
    if (isUserHasRequiredRole) {
      return <Component />;
    }
  }
  return <Navigate to="/unauthorized" replace />;
};

export default function Router() {
  const { user } = useAppSelector((state) => state?.user);
  const isNewMerchantUser =
    user?.roleType === RoleTypes.MERCHANT &&
    (!user?.merchantRoles || user?.merchantRoles?.length <= 0) &&
    user?.status !== "INACTIVE";

  const role = isAdminOrMerchant();

  return useRoutes([
    {
      path: "/promotions",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="all-promotions" />, index: true },
        {
          path: "productsList-cart",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <ProductsListCart />
            </Suspense>
          ),
        },
        {
          path: "all-promotions",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <AllPromotions />
            </Suspense>
          ),
        },
        {
          path: "promotion-templates",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Promotions />
            </Suspense>
          ),
        },
        {
          path: "edit-promotion/:id",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <EditPromotions />
            </Suspense>
          ),
        },
      ],
    },
  ]);
}
