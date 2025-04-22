import React from "react";
import MerManagementIcon from "../../../assets/Icons/MerchantManagementIcon.svg";
import ProductIcon from "../../../assets/Icons/ProductIcon.svg";
import OrderIcon from "../../../assets/Icons/OrderIcon.svg";
import AdministrationIcon from "../../../assets/Icons/AdministrationIcon.svg";
import MyAccountIcon from "../../../assets/Icons/MyAccountIcon.svg";
import HomeIcon from "../../../assets/Icons/HomeIcon.svg";
import userPermissions from "../../../utils/userPermissions";
import { ROLE_TYPE as RoleTypes } from "../../../constants";

const permissionToViewPendingApproval = {
  opMerchantManagementAccess: ["viewPendingApproval"],
};
const permissionsToViewUserManagement = {
  opAdministrationAccess: ["viewUserManagementSubModule"],
};

const getIconComponent = (iconSrc, alt) => () => (
  <img src={iconSrc} alt={alt} />
);

const getNavList = (user) => {
  const navConfig = {
    [RoleTypes.ADMIN]: [
      {
        title: "Home",
        icon: getIconComponent(HomeIcon, "home icon"),
        to: "/home",
      },
      {
        title: "Merchant Management",
        icon: getIconComponent(MerManagementIcon, "Merchant Management Icon"),
        nestedItems: [
          {
            title: "All Merchants",
            to: "/merchant-management/all-merchants",
          },
        ],
      },
      {
        title: "Products",
        icon: getIconComponent(ProductIcon, "Product Icon"),
        nestedItems: [
          {
            title: "All Products",
            to: "/products/all-products?tab=ALL_PRODUCTS",
          },
          {
            title: "Product Templates",
            to: "/products/product-templates",
          },
        ],
      },
      {
        title: "Orders",
        icon: getIconComponent(OrderIcon, "Order Icon"),
        nestedItems: [
          {
            title: "All Orders",
            to: "/orders/all-orders",
          },
        ],
      },
      {
        title: "Administration",
        icon: getIconComponent(AdministrationIcon, "Administration Icon"),
        nestedItems: [],
      },
    ],
    [RoleTypes.MERCHANT]: [
      {
        title: "Home",
        icon: getIconComponent(HomeIcon, "home icon"),
        to: "/home",
      },
      {
        title: "Products",
        icon: getIconComponent(ProductIcon, "Product Icon"),
        nestedItems: [
          {
            title: "Add New Products",
            to: "/products/add-new-products",
          },
          {
            title: "My Products",
            to: "/products/my-products?tab=ALL_PRODUCTS",
          },
        ],
      },
      {
        title: "Orders",
        icon: getIconComponent(OrderIcon, "Order Icon"),
        nestedItems: [
          {
            title: "All Orders",
            to: "/orders/all-orders",
          },
        ],
      },
      {
        title: "My Account",
        icon: getIconComponent(MyAccountIcon, "My Account Icon"),
        nestedItems: [
          {
            title: "Shop Information",
            to: "/my-account/shop-information",
          },
        ],
      },
      {
        title: "Administration",
        icon: getIconComponent(AdministrationIcon, "Administration Icon"),
        nestedItems: [
          {
            title: "User Management",
            to: "/administration_mer/user-management",
          },
        ],
      },
    ],
    ["Promotions"]:[
      {
        title: "Promotions",
        icon: getIconComponent(AdministrationIcon, "Administration Icon"),
        
        nestedItems: [
          {
            title: "Products List & Cart",
            to: "/promotions/productsList-cart",
          },
          {
            title: "All Promotions",
            to: "/promotions/all-promotions",
          },
          {
            title: "Promotion Templates",
            to: "/promotions/promotion-templates",
          },
        ]
      },
    ]
  };

  const isAdmin = user?.roleType === RoleTypes.ADMIN;
  if (isAdmin) {
    const viewPendingApproval = userPermissions(
      user,
      permissionToViewPendingApproval
    );
    const viewUserManagementSubModule = userPermissions(
      user,
      permissionsToViewUserManagement
    );

    if (viewUserManagementSubModule) {
      navConfig[RoleTypes.ADMIN][4].nestedItems.push({
        title: "User Management",
        to: "/administration/user-management",
      });
    }

    if (viewPendingApproval) {
      navConfig[RoleTypes.ADMIN][1].nestedItems.push({
        title: "Pending Approval",
        to: "/merchant-management/pending-approval",
      });
    }
  }

  return user ? navConfig[user?.roleType] : navConfig["Promotions"];
};

export default getNavList;
