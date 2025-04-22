import * as yup from "yup";
import {ROLE_TYPE} from '../constants'

export const createNewRoleForMer = (roleData, user) => {
  return {
    name: roleData.name,
    isDefault: false,
    merchantId: roleData.merchantId,
    status: "ACTIVE",
    roleType: 1,
    lastUpdatedBy: user.email,
    ...roleData.customRoleAccess,
  };
};

export const creatNewRoleModel = (
  RoleData,
  user,
  selectedMerchantId,
  isDefaultRole
) => {
  const merchantId = () => {
    if (user?.roleType === ROLE_TYPE.ADMIN && selectedMerchantId) {
      return selectedMerchantId;
    } else {
      return user?.defaultShop;
    }
  };
  const roleType = () => {
    if (user?.roleType === ROLE_TYPE.ADMIN && selectedMerchantId) {
      return ROLE_TYPE.MERCHANT;
    } else {
      return user.roleType;
    }
  };
  const name = RoleData.customRoleTitle;
  const isDefault = isDefaultRole ?? false;
  return {
    name,
    isDefault,
    merchantId: merchantId(),
    status: "ACTIVE",
    roleType: roleType(),
    lastUpdatedBy: user.email,
    ...RoleData.customRoleAccess,
  };
};

export const createNewUserModel = (userData, user, selectedMerchantId) => {
  const userModel = {
    email: userData.email,
    name: userData?.userName,
    roleType: user.roleType,
    lastUpdatedBy: user.email,
  };
  if (user.roleType === ROLE_TYPE.ADMIN && !selectedMerchantId) {
    userModel.operatorRoles = [];
  } else if (user.roleType === ROLE_TYPE.ADMIN && selectedMerchantId) {
    userModel.roleType = 1;
    userModel.merchantRoles = [];
    userModel.defaultShop = selectedMerchantId;
  } else {
    userModel.merchantRoles = [];
    userModel.defaultShop = user.defaultShop;
  }
  return userModel;
};

export const getOfRoleCurrentShop = (userRoles, currentShop) => {
  if (userRoles) {
    return userRoles?.find((item) => item?.merchantId === currentShop);
  }
  return {};
};

export const getFileExtention = (fileName = "") => {
  return "." + fileName?.split(".").pop().toLowerCase();
};

export const REQUIRED_MESSAGE = "Field is Required";
export const MAX_CHAR_255 =
  "Input Length Exceeds Limit. Please Limit to 255 Characters.";
export const MAX_CHAR_2000 =
  "Input Length Exceeds Limit. Please Limit to 2000 Characters.";
export const SELECT_MSG = "Please Select an Option";
export const INVALID_DATE = "Invalid Date";
export const END_DATE_ERROR = "End date Should be after the Start date";
export const NUMBER_MSG = "The Value must be a Number";
export const SERVER_ERROR_MSG = {
  type: "error",
  message: "Server not responding. Please try again later",
};

function stringToColor(string = "") {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name = "") {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`.toUpperCase(),
  };
}

export const ADD_NEW_ROLE = "+ Add New Role";
export const USER_STATUS_INACTIVE = "INACTIVE";
export const USER_STATUS_ACTIVE = "ACTIVE";
export const USER_STATUS_INVITED = "INVITED";
export const USER_STATUS_DEACTIVATED = "DEACTIVATED";

export const SERVER_ERROR = {
  message: "Something went wrong on server. Please try again later.",
  isErrorMsg: true,
};

const titleCheck = (role, schema) => {
  if (role[0] === ADD_NEW_ROLE) {
    return schema
      .required("Custom Role Title is Required")
      .min(3)
      .max(50)
      .trim("Invalid Input")
      .matches(/^[a-zA-Z0-9 ]+$/, "Special characters are Not allowed")
      .matches(/^(?:(?!\s{2,}).)*$/, "Consecutive spaces are not allowed");
  }
};

export const merchantNameCheck = (value, schema) => {
  if (value) {
    return schema.required("Please select a shop");
  }
  return null;
};
const roleCheck = (role, schema) => {
  const roleSchemaData = schema.test({
    name: "atLeastOneY",
    test: (object) => {
      const values = Object.values(object);
      return values.some((value) => {
        return value ? Object.values(value).includes("Y") : false;
      });
    },
    message: "* Select at least one permission",
  });
  if ((role[0] === ADD_NEW_ROLE && role?.length === 1) || role?.length > 1) {
    return roleSchemaData;
  }
};

export const roleSchema = yup.object().shape({
  roleId: yup.string().required("Select a Role"),
  name: yup.string().when("roleId", titleCheck),
  customRoleAccess: yup.object().when("roleId", roleCheck),
});

export const editUserSchema = yup.object().shape({
  role: yup.string().required("Select a Role"),
  customRoleTitle: yup.string().when("role", titleCheck),
  customRoleAccess: yup.object().when("role", roleCheck),
});

export const newUserSchema = (selectedMerchantId, selectedRoleId) => {
  const commonSchema = {
    email: yup.string().required("Email is Required").email("Invalid Email"),
    role: yup.string().required("Select a Role"),
    customRoleTitle: yup.string().when("role", titleCheck),
    customRoleAccess: yup.object().when("role", roleCheck),
  };

  let schema = null;

  if (selectedMerchantId) {
    if (selectedRoleId !== ADD_NEW_ROLE) {
      schema = {
        ...commonSchema,
        customRoleAccess: null,
        merchantName: yup.object().when("email", merchantNameCheck),
      }
    } else {
      schema = {
        ...commonSchema,
        merchantName: yup.object().when("email", merchantNameCheck),
      }
    }
  } else {
    schema = commonSchema
  }

  return yup.object().shape(schema);
};

export const newRoleObj = {
  roleId: ADD_NEW_ROLE,
  name: "",
  customRoleAccess: {
    merDataInsightsAccess: {
      viewDashboard: "N",
      exportSalesReport: "N",
      exportInventoryReport: "N",
      exportOrderReport: "N",
      exportGiroReport: "N",
    },
    merMyAccountAccess: {
      addNewUsers: "N",
      editUserRoles: "N",
      createNewRoles: "N",
      viewBusinessInfo: "N",
      editBusinessInfo: "N",
      viewFinanceInfo: "N",
      editFinanceInfo: "N",
      editLeaseInfo: "N",
      viewLeaseInfo: "N",
      viewLogisticsInfo: "N",
    },
    merOrderAccess: {
      viewOrders: "N",
      editOrders: "N",
      exportOrders: "N",
      viewReturns: "N",
    },
    merProductAccess: {
      viewProducts: "N",
      addAndEditProducts: "N",
      deactivateProducts: "N",
      deleteProducts: "N",
      exportProducts: "N",
    },
  },

  opCustomRoleAccess: {
    opAdministrationAccess: {
      viewUserManagementSubModule: "N",
      addNewOperatorUsers: "N",
      exportListOfAllUsers: "N",
      deactivateOperators: "N",
      deactivateMerchants: "N",
      viewPlatformActivitySubModule: "N",
      editOperatorRolesAndPermission: "N",
      editMerchantRolesAndPermission: "N",
    },
    opDataInsightsAccess: {
      viewDashboard: "N",
      exportSalesReport: "N",
      exportInventoryReport: "N",
      exportOrderReport: "N",
      exportGiroReport: "N",
      exportEncryptedGiro: "N",
      exportVoucherUsageReport: "N",
    },
    opMerchantManagementAccess: {
      merchantInvite: "N",
      businessApprove: "N",
      financeApprove: "N",
      leasingApprove: "N",
      merchantApprove: "N",
      suspendOrLiveMerchant: "N",
      viewMerchantAccountInfo: "N",
      editMerchantBusinessInfo: "N",
      editMerchantFinanceInfo: "N",
      editMerchantLeaseInfo: "N",
      editMerchantLogisticsInfo: "N",
      exportMerchantInfo: "N",
      viewPendingApproval: "N",
    },
    opOrderAccess: {
      viewAllOrders: "N",
      editAllOrders: "N",
      exportOrders: "N",
      viewReturns: "N",
      manageReturns: "N",
      manageRefunds: "N",
    },
    opProductAccess: {
      viewAllProducts: "N",
      editAllProducts: "N",
      deactivateProducts: "N",
      deleteProducts: "N",
      exportProducts: "N",
      approveRejectProducts: "N",
    },
  },
};
