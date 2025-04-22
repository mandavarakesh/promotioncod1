
export const adminPerms = [
  {
    id: 1,
    title: "Merchant Management",
    name: "opMerchantManagementAccess",
    permissions: [
      { label: "Merchant Invite", value: "merchantInvite" },
      { label: "Business Approve", value: "businessApprove" },
      { label: "Finance Approve", value: "financeApprove" },
      { label: "Leasing Approve", value: "leasingApprove" },
      { label: "Merchant Approve", value: "merchantApprove" },
      { label: "Suspend or Live Merchant", value: "suspendOrLiveMerchant" },
      { label: "View Merchant Account Info", value: "viewMerchantAccountInfo" },
      {
        label: "Edit Merchant Business Info",
        value: "editMerchantBusinessInfo",
      },
      { label: "Edit Merchant Finance Info", value: "editMerchantFinanceInfo" },
      { label: "Edit Merchant Lease Info", value: "editMerchantLeaseInfo" },
      {
        label: "Edit Merchant Logistics Info",
        value: "editMerchantLogisticsInfo",
      },
      { label: "Export Merchant Info", value: "exportMerchantInfo" },
      { label: "View Pending Approval", value: "viewPendingApproval" },
    ],
  },
  {
    id: 2,
    title: "Products",
    name: "opProductAccess",
    permissions: [
      { label: "View All Products", value: "viewAllProducts" },
      { label: "Edit All Products", value: "editAllProducts" },
      { label: "Export Products", value: "exportProducts" },
      { label: "Approve Reject Products", value: "approveRejectProducts" },
    ],
  },
  {
    id: 3,
    title: "Orders",
    name: "opOrderAccess",
    permissions: [
      { label: "View All Orders", value: "viewAllOrders" },
      { label: "Edit All Orders", value: "editAllOrders" },
      { label: "Export Orders", value: "exportOrders" },
      { label: "View Returns", value: "viewReturns" },
      { label: "Manage Returns", value: "manageReturns" },
      { label: "Manage Refunds", value: "manageRefunds" },
    ],
  },
  {
    id: 4,
    title: "Data Insights",
    name: "opDataInsightsAccess",
    permissions: [
      { label: "View Dashboard", value: "viewDashboard" },
      { label: "Export Sales Report", value: "exportSalesReport" },
      { label: "Export Inventory Report", value: "exportInventoryReport" },
      { label: "Export Order Report", value: "exportOrderReport" },
      { label: "Export Giro Report", value: "exportGiroReport" },
      { label: "Export Encrypted Giro", value: "exportEncryptedGiro" },
      {
        label: "Export Voucher Usage Report",
        value: "exportVoucherUsageReport",
      },
    ],
  },
  {
    id: 5,
    title: "Administration",
    name: "opAdministrationAccess",
    permissions: [
      {
        label: "View User Management SubModule",
        value: "viewUserManagementSubModule",
      },
      { label: "Add New Operator Users", value: "addNewOperatorUsers" },
      { label: "Export List Of AllUsers", value: "exportListOfAllUsers" },
      { label: "Deactivate Operators", value: "deactivateOperators" },
      { label: "Deactivate Merchants", value: "deactivateMerchants" },
      {
        label: "View Platform Activity SubModule",
        value: "viewPlatformActivitySubModule",
      },
      {
        label: "Edit Operator Roles and Permission",
        value: "editOperatorRolesAndPermission",
      },
      {
        label: "Edit Merchant Roles and Permission",
        value: "editMerchantRolesAndPermission",
      }
    ],
  },
]

export const merchantPerms = [
  {
    id: 1,
    title: "My Account",
    name: "merMyAccountAccess",
    permissions: [
      { label: "Add New Users", value: "addNewUsers" },
      { label: "Edit User Roles", value: "editUserRoles" },
      { label: "Create New Roles", value: "createNewRoles" },
      { label: "View Business Info", value: "viewBusinessInfo" },
      { label: "Edit Business Info", value: "editBusinessInfo" },
      { label: "View Finance Info", value: "viewFinanceInfo" },
      { label: "Edit Finance Info", value: "editFinanceInfo" },
      { label: "Edit Lease Info", value: "editLeaseInfo" },
      { label: "View Lease Info", value: "viewLeaseInfo" },
      { label: "View Logistics Info", value: "viewLogisticsInfo" },
    ],
  },
  {
    id: 2,
    title: "Products",
    name: "merProductAccess",
    permissions: [
      { label: "View Products", value: "viewProducts" },
      { label: "Add & Edit Products", value: "addAndEditProducts" },
      { label: "Delete Products", value: "deleteProducts" },
      { label: "Export Products", value: "exportProducts" },
    ],
  },
  {
    id: 3,
    title: "Orders",
    name: "merOrderAccess",
    permissions: [
      { label: "View Orders", value: "viewOrders" },
      { label: "Edit Orders", value: "editOrders" },
      { label: "Export Orders", value: "exportOrders" },
      { label: "View Returns", value: "viewReturns" },
    ],
  },
  {
    id: 4,
    title: "Data Insights",
    name: "merDataInsightsAccess",
    permissions: [
      { label: "View Dashboard", value: "viewDashboard" },
      { label: "Export Sales Report", value: "exportSalesReport" },
      { label: "Export Inventory Report", value: "exportInventoryReport" },
      { label: "Export Order Report", value: "exportOrderReport" },
      { label: "Export Giro Report / TT Report", value: "exportGiroReport" },
    ],
  },
];