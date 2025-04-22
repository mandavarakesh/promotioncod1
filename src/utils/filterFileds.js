import { GET_MER_ROLES_FOR_FILTER,GET_BRANDS, GET_REFUND_CODES, GET_SHIPPING_METHODS } from "../graphql/queries";
 
 
 
const statusOptions =  [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "INVITED", label: "Invited" },
  { value: "DEACTIVATED", label: "Deactivated" }
]
const forOperatorUsers = [
  {
    id: 1,
    name: "name",
    label: "User Name",
    type: "TEXT",
  },
  {
    id: 2,
    name: "status",
    label: "Status",
    type: "SELECT",
    options: statusOptions,
  },
  {
    id: 3,
    name: "roleName",
    label: "Role",
    type: "TEXT",
  },
];
 
const forMerchantUsers = [
  {
    id: 1,
    name: "merchantId",
    label: "Shop",
    type: "ASYNCAUTOCOMPLETEWITHCHECKBOX",
    queryName: "GET_ALLMERCHANT_NAMES",
  },
  {
    id: 2,
    name: "name",
    label: "User Name",
    type: "TEXT",
  },
  {
    id: 3,
    name: "status",
    label: "Status",
    type: "SELECT",
    options: statusOptions,
  },
  {
    id: 4,
    name: "roleName",
    label: "Role",
    type: "INFINITESELECT",
    queryName: GET_MER_ROLES_FOR_FILTER,
    queryKey: "GET_MER_ROLES_FOR_FILTER",
    queryVariableKey: "roleBody",
    initialVariables: { page: 1, pageSize: 10, name: "" },
    mapOptionFunction: (item) => ({
      label: item?.name ?? "",
      value: item?.roleId ?? "",
    }),
    mapDataFunction: (data) =>
      data?.pages.map((pg) => pg?.getMerchantRoles?.data)?.flat() ?? [],
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.getMerchantRoles?.data?.length === 10
        ? allPages.length + 1
        : undefined,
    variablesFunction: (prev, e) => ({
      ...prev,
      name: e?.target?.value ?? "",
    }),
    filterOptions: (options) => {
      if (options?.length > 0) {
        return [...new Map(options.map(item => [item?.label?.toLowerCase(), item])).values()]
      }
      return []
    },
    getOutPutAsOption: true
  }
];
 
 
 
 
// Orders Filter Fields
 
const fields = [
  {
    id: 1,
    name: "commercialId",
    label: "Order No.",
    type: "TEXT",
  },
  {
    id: 2,
    name: "fullName",
    label: "Customer Name",
    type: "TEXT",
  },
  {
    id: 3,
    name: "orderCreationDatetime",
    label: "Order Created Date",
    type: "DATETIMERANGEPICKER",
  },
  {
    id: 4,
    name: "status",
    label: "Order Status",
    type: "SELECT",
    disabled: false,
    defaultValue: "",
    options: [
      { value: "OPEN", label: "OPEN" },
      { value: "READYTOSHIP", label: "READY TO SHIP" },
      { value: "SHIPPED", label: "SHIPPING IN PROGRESS" },
      { value: "RECEIVED", label: "DELIVERED TO CUSTOMER" },
      { value: "REFUNDED", label: "REFUNDED" },
    ],
  },
  {
    id: 5,
    name: "flightNum",
    label: "Flight Number",
    type: "TEXT",
  },
 
  {
    id: 6,
    name: "flightDatetime",
    label: "Flight Date & Time",
    type: "DATETIMERANGEPICKER",
  },
 
  {
    id: 7,
    name: "terminal",
    label: "Terminal",
    type: "TEXT",
  },
  {
    id: 8,
    name: "promotionCode",
    label: "Promo Code",
    type: "TEXT",
  },
  {
    id: 9,
    name: "isGHROrder",
    label: "Is GHR Order ?",
    type: "SELECT",
    options: [
      { value: "true", label: "YES" },
      { value: "false", label: "NO" },
    ],
  },
  {
    id: 10,
    name: "shippingTypeCode",
    label: "Shipping Method",
    type: "INFINITESELECT",
    queryName: GET_SHIPPING_METHODS,
    queryKey: "GET_SHIPPING_METHODS",
    queryVariableKey: "",
    initialVariables: {},
    mapOptionFunction: (item) => ({
      label: item?.name ?? "",
      value: item?.code ?? "",
    }),
    mapDataFunction: (data) =>
      data?.pages.map((pg) => pg?.ecsGetShippingCodes?.data)?.flat() ?? [],
    variablesFunction: (prev) => ({
      ...prev,
    }),
    getOutPutAsOption: true,
 
  },
 
  {
    id: 11,
    name: "deliveryDatetime",
    label: "Delivery Collection Date & Time",
    type: "DATETIMERANGEPICKER",
  },
 
  {
    id: 12,
    name: "pickUpByCourier",
    label: "Picked Up by Courier",
    type: "DATE",
  },
  {
    id: 13,
    name: "deliveredByCourier",
    label: "Delivered by Courier",
    type: "DATE",
  },
  {
    id: 14,
    name: "hasCancellations",
    label: "Order with Refunds",
    type: "SELECT",
    options: [
      { value: "true", label: "YES" },
      { value: "false", label: "NO" },
    ],
  },
 
  {
    id: 15,
    name: "customerPhone",
    label: "Customer Number",
    type: "TEXT",
  },
 
  {
    id: 16,
    name: "customerId",
    label: "E-mail",
    type: "TEXT",
  },
  {
    id: 17,
    name: "nationality",
    label: "Nationality",
    type: "TEXT",
  },
  {
    id: 18,
    name: "passportLast4",
    label: "Passport Number",
    type: "TEXT",
  },
  {
    id: 19,
    name: "customerType",
    label: "Customer Type",
    type: "SELECT",
    options: [
      { value: "TRAVELLER", label: "Traveller" },
      { value: "NON-TRAVELLER", label: "Non-Traveller" },
    ],
  },
  {
    id: 20,
    name: "orderType",
    label: "Order Type",
    type: "SELECT",
    options: [
      { value: "DEPARTURE", label: "DEPARTURE" },
      { value: "ARRIVAL", label: "ARRIVAL" },
      { value: "HD", label: "Home Delivery" },
      {
        value: "LANDSIDE",
        label: "Jewel",
      },
    ],
  },
  {
    id: 21,
    name: "orderAmount",
    label: "Order Amount",
    type: "RANGE",
  },
  {
    id: 22,
    name: "discountAmount",
    label: "Discount Amount",
    type: "TEXT",
  },
  {
    id: 23,
    name: "promotionDiscountAmount",
    label: "Promotion Discount Amount",
    type: "TEXT",
  },
  {
    id: 24,
    name: "destination",
    label: "Destination",
    type: "TEXT",
  },
  {
    id: 25,
    name: "pickUpDate",
    label: "Pickup Date From Warehouse",
    type: "DATETIMERANGEPICKER",
  },
  {
    id: 26,
    name: "numBoxes",
    label: "Number of boxes",
    type: "TEXT",
  },
  {
    id: 27,
    name: "lagItem",
    label: "LAG Item",
    type: "SELECT",
    options: [
      { value: "true", label: "YES" },
      { value: "false", label: "NO" },
    ],
  },
  
  {
    id: 29,
    name: "cancellationReasonCodes",
    label: "Cancellation Reasons",
    type: "INFINITESELECT",
    queryName: GET_REFUND_CODES,
    queryKey: "GET_REFUND_CODES",
    queryVariableKey: "",
    initialVariables: {},
    mapOptionFunction: (item) => ({
      label: item?.name ?? "",
      value: item?.code ?? "",
    }),
    mapDataFunction: (data) =>
      data?.pages.map((pg) => pg?.ecsGetRefundCodes?.data)?.flat() ?? [],
    variablesFunction: (prev, _e) => ({
      ...prev,
    }),
    getOutPutAsOption: true,
 
  },
 
  {
    id: 30,
    name: "mpNums",
    label: "MP Number",
    type: "TEXT",
  },
 
  {
    id: 31,
    name: "brandSlugs",
    label: "Brand",
    type: "INFINITESELECT",
    queryName: GET_BRANDS,
    queryKey: "GET_BRANDS",
    queryVariableKey: "filterData",
    initialVariables: { page: 1, pageSize: 10, enName: "" },
    mapOptionFunction: (item) => ({
      label: item?.lang?.en?.name ?? "",
      value: item?.slug ?? "",
    }),
    mapDataFunction: (data) =>
      data?.pages.map((pg) => pg?.ecsGetBrands?.data)?.flat() ?? [],
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.ecsGetBrands?.data?.length === 10
        ? allPages?.length + 1
        : undefined,
    variablesFunction: (prev, e) => ({
      ...prev,
      enName: e?.target?.value ?? "",
    }),
    getOutPutAsOption: true,
  },
  {
    id: 32,
    name: "productName",
    label: "Product Name",
    type: "TEXT",
  },
  {
    id: 33,
    name: "shippingDeadLine",
    label: "Shipping Deadline",
    type: "SELECT",
    disabled: false,
    defaultValue: "",
    options: [
      { value: "Late", label: "Late" },
      { value: "Today", label: "Today" },
      { value: "Tomorrow", label: "Tomorrow" },
    ],
  },
  {
    id: 34,
    name: "lmsReceiptNo",
    label: "LMS Receipt Number",
    type: "TEXT",
  },
];
export { forOperatorUsers, forMerchantUsers, fields };