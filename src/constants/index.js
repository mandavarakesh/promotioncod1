//dashboard constants
const NAV_BAR_WIDTH = 280;
const HEADER_WIDTH = 64;

//user constants
const ROLE_TYPE = Object.freeze({
  ADMIN: 0,
  MERCHANT: 1,
});

const PRODUCT_STATUS = Object.freeze({
  PENDINGAPPROVAL: "Pending Approval",
  APPROVED: "Approved",
  DEACTIVATED: "Deactivated",
  CHANGESREQUIRED: "Changes Required",
  REJECTED: "Rejected",
  DELETED: "Deleted",
});

const MERCHAT_ENMS = Object.freeze({
  OFF_AIRPORT: "Off Airport",
  IN_AIRPORT_GENERAL: "In Airport General",
  CAG_RETAIL: "CAG Retail",
  IN_EXCEPTIONS_CC: "In Exceptions CC",
  IN_EXCEPTIONS_WH: "In Exception WH",
  OFF_AIRPORT_MARKETPLACE: "Off Airport Marketplace",
  IN_AIRPORT_AIRSIDE: "In Airport Airside",
  IN_AIRPORT_LANDSIDE: "In Airport Landside",
  IN_AIRPORT_JEWEL: "In Airport Jewel",
  IN_AIRPORT: "In Airport",
  OFF_AIRPORT_WHOLESALE: "Off Airport Wholesale",
  OFF_AIRPORT_RETAILING: "Off Airport Retailing",
  DROPSHIP: "Dropship",
  CAG_CONSOLIDATED: "CAG Consolidated",
  DROPSHIP_MERCHANT3PL: "MERCHANT3PL",
  DROPSHIP_CAG3PL: "CAG3PL",
  TIMESLOT: "Timeslot",
  NON_TIMESLOT: "Non Timeslot",
  "-": "-",
});

const STATUS = Object.freeze({
  ACTIVE: { message: "Active", color: "success" },
  INVITED: { message: "Invited", color: "info" },
  INACTIVE: { message: "Inactive", color: "error" },
  DEACTIVATED: { message: "Deactivated", color: "error" },
  DELETED: { message: "Deleted", color: "error" },
  DRAFT: { message: "Draft", color: "info" },
  PENDINGAPPROVAL: { message: "Pending Approval", color: "warning" },
  REVIEWINPROGRESS: { message: "Review in Progress", color: "warning" },
  REJECTED: { message: "Rejected", color: "error" },
  APPROVED: { message: "Approved", color: "success" },
  OPEN: { message: "Open", color: "success" },
  SUSPENDED: { message: "Suspended", color: "error" },
  CHANGESREQUIRED: { message: "Changes Required", color: "info" },
  NEW: { message: "New", color: "info" },
  PENDINGUPDATES: { message: "Pending Updates", color: "primary" },
});

const WEB_SOCKET_PROTOCOL = "graphql-ws";

export {
  ROLE_TYPE,
  MERCHAT_ENMS,
  PRODUCT_STATUS,
  STATUS,
  NAV_BAR_WIDTH,
  HEADER_WIDTH,
  WEB_SOCKET_PROTOCOL
};


