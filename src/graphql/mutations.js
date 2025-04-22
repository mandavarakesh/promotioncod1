import gql from "graphql-tag";

// to post data to create a new user

export const CREATE_USER = gql`
  mutation MyMutation($newUserData: String!) {
    ecsAddUser(body: $newUserData) {
      code
      message
    }
  }
`;

// to insert a role for a user in data base

export const INSERT_MERCHANT_ROLE = gql`
  mutation MyMutation($newRole: String!) {
    insertMerchantRole(body: $newRole) {
      code
      data {
        createDate
        isDefault
        lastUpdateDate
        lastUpdatedBy
        merDataInsightsAccess {
          viewDashboard
          exportSalesReport
          exportInventoryReport
          exportOrderReport
          exportGiroReport
        }
        merMyAccountAccess {
          addNewUsers
          editUserRoles
          createNewRoles
          viewBusinessInfo
          editBusinessInfo
          viewFinanceInfo
          editFinanceInfo
          editLeaseInfo
          viewLeaseInfo
          viewLogisticsInfo
        }
        merOrderAccess {
          viewOrders
          editOrders
          exportOrders
          viewReturns
        }
        merProductAccess {
          viewProducts
          addAndEditProducts
          deactivateProducts
          deleteProducts
          exportProducts
        }
        merchantId
        name
        roleId
        roleType
        status
      }
      message
    }
  }
`;

export const INSERT_ADMIN_ROLE = gql`
  mutation MyMutation($newRole: AWSJSON!) {
    insertOperatorRole(body: $newRole) {
      code
      message
      data {
        roleId
        merchantId
        name
        status
        lastUpdateDate
        createDate
        isDefault
        lastUpdatedBy
        roleType
        opDataInsightsAccess {
          viewDashboard
          exportSalesReport
          exportInventoryReport
          exportOrderReport
          exportGiroReport
          exportEncryptedGiro
          exportVoucherUsageReport
        }
        opAdministrationAccess {
          viewUserManagementSubModule
          addNewOperatorUsers
          exportListOfAllUsers
          deactivateOperators
          deactivateMerchants
          viewPlatformActivitySubModule
          editOperatorRolesAndPermission
          editMerchantRolesAndPermission
        }
        opMerchantManagementAccess {
          merchantInvite
          businessApprove
          financeApprove
          leasingApprove
          merchantApprove
          suspendOrLiveMerchant
          viewMerchantAccountInfo
          editMerchantBusinessInfo
          editMerchantFinanceInfo
          editMerchantLeaseInfo
          editMerchantLogisticsInfo
          exportMerchantInfo
          viewPendingApproval
        }
        opOrderAccess {
          viewAllOrders
          editAllOrders
          exportOrders
          viewReturns
          manageReturns
          manageRefunds
        }
        opProductAccess {
          viewAllProducts
          editAllProducts
          deactivateProducts
          deleteProducts
          exportProducts
          approveRejectProducts
        }
      }
    }
  }
`;

// to update role for user
export const UPDATE_MERCHANT_ROLE = gql`
  mutation MyMutation($updatedRole: String!) {
    updateMerchantRole(body: $updatedRole) {
      code
      data {
        merchantId
        name
        roleId
        roleType
        status
        lastUpdatedBy
        lastUpdateDate
        isDefault
        createDate
        merDataInsightsAccess {
          viewDashboard
          exportSalesReport
          exportInventoryReport
          exportOrderReport
          exportGiroReport
        }
        merMyAccountAccess {
          addNewUsers
          editUserRoles
          createNewRoles
          viewBusinessInfo
          editBusinessInfo
          viewFinanceInfo
          editFinanceInfo
          editLeaseInfo
          viewLeaseInfo
          viewLogisticsInfo
        }
        merOrderAccess {
          viewOrders
          editOrders
          exportOrders
          viewReturns
        }
        merProductAccess {
          viewProducts
          addAndEditProducts
          deactivateProducts
          deleteProducts
          exportProducts
        }
      }
      message
    }
  }
`;

export const UPDATE_ADMIN_ROLE = gql`
  mutation MyMutation($updatedRole: AWSJSON!) {
    updateOperatorRole(body: $updatedRole) {
      code
      data {
        roleId
        merchantId
        name
        status
        lastUpdateDate
        createDate
        isDefault
        lastUpdatedBy
        roleType
        opAdministrationAccess {
          viewUserManagementSubModule
          addNewOperatorUsers
          exportListOfAllUsers
          deactivateOperators
          deactivateMerchants
          viewPlatformActivitySubModule
          editOperatorRolesAndPermission
          editMerchantRolesAndPermission
        }
        opDataInsightsAccess {
          viewDashboard
          exportSalesReport
          exportInventoryReport
          exportOrderReport
          exportGiroReport
          exportEncryptedGiro
          exportVoucherUsageReport
        }
        opMerchantManagementAccess {
          merchantInvite
          businessApprove
          financeApprove
          leasingApprove
          merchantApprove
          suspendOrLiveMerchant
          viewMerchantAccountInfo
          editMerchantBusinessInfo
          editMerchantFinanceInfo
          editMerchantLeaseInfo
          editMerchantLogisticsInfo
          exportMerchantInfo
          viewPendingApproval
        }
        opOrderAccess {
          viewAllOrders
          editAllOrders
          exportOrders
          viewReturns
          manageReturns
          manageRefunds
        }
        opProductAccess {
          viewAllProducts
          editAllProducts
          deactivateProducts
          deleteProducts
          exportProducts
          approveRejectProducts
        }
      }
      message
    }
  }
`;

// to delete the user in merchant usermanagement

export const DELETE_USER = gql`
  mutation MyMutation($userDetails: AWSJSON!) {
    ecsDeleteUser(queryStringParameters: $userDetails) {
      code
      message
    }
  }
`;
// API to update a merchant
export const UPDATE_MERCHANT = gql`
  mutation MyMutation($queryParameters: AWSJSON!, $requestBody: AWSJSON!) {
    ecsUpdateMerchant(
      queryStringParameters: $queryParameters
      body: $requestBody
    ) {
      code
      message
      data {
        merchantId
        logo
        companyName
        storeName {
          name
        }
        companyAddress {
          contactPersonFirstName
          contactPersonLastName
          businessInfoEmail
          contactNumber
          faxNumber
          companyAddress1
          companyAddress2
          city
          country
          postalCode
        }
        category
        businessRegistrationNumber
        accountManager
        gstAbsorptionNonTraveller
        gstAbsorptionTraveller
        dutyFreeTenant
        jewelTenant
        shippingFeeToCAG
        merchantType
        suspendedAccount
        merchantClassification
        applicationReferenceNumber
        bankCode
        branchCode
        accountName
        accountNumber
        bankName
        swiftCode
        gstRegisteredEntity
        gstNumber
        payment2c2pSubMID
        liquidMID
        rentalDeptCode
        financeStatus
        financeRejectedReason
        tenantAgreementReference
        tenancyStartDate
        tenancyEndDate
        concessionaireCode
        tenantLmsId
        dcaFile
        ddaFile
        dcaFileStatus
        ddaRejectedReason
        ddaFileStatus
        dcaRejectedReason
        leaseInfoStatus
        leaseRejectedReason
        fulfilmentArrival
        fulfilmentLandside
        fulfilmentDeparture
        fulfilmentTravellerHomeDel
        fulfilmentNTHomeDel
        opsContactFirstName
        opsContactLastName
        logisticsEmail
        logisticsContactNumber
        wareHousePickupAddress1
        wareHousePickupAddress2
        postalCode
        country
        departureOrderLeadTime
        shipmentTypeAirport
        arrival
        departure
        landside
        shipmentTypeSgDel
        dropshipType
        deliverySLA
        deliveryMode
        deliveryMessage
        minSpendForFreeDelivery
        deliveryFee
        pickupSlotStartTime
        pickupSlotEndTime
        nonOperatingStartDay
        nonOperatingStartTime
        nonOperatingEndDay
        nonOperatingEndTime
        nonOperatingOrderLeadTime
        publicHolidaysApplicable
        merchantStatus
        merchantRejectedReason
        createDate
        lastUpdateDate
        lastUpdatedBy
        nonOperatingConfigured
        businessInfoStatus
        businessInfoRejectedReason
        suspendReason
        dateOfSuspension
        closedFrom
        closedTo
        orderMailingList
        productMailingList
        opsMailingList
        opsContactNumber
        reportName
        description
        faxNo
        financeEmail
        bankDetailsAttachment
        paymentCurrency
        foreignBankAccount
        bankAdditionalAddress
        oddEligible
        isGHR
      }
    }
  }
`;

// API to create a merchant

export const CREATE_MERCHANT = gql`
  mutation MyMutation($queryParameters: AWSJSON!, $requestBody: AWSJSON!) {
    ecsAddMerchant(
      queryStringParameters: $queryParameters
      body: $requestBody
    ) {
      code
      data {
        businessRegistrationNumber
        companyAddress {
          companyAddress1
          companyAddress2
          city
          country
          postalCode
        }
        companyName
        storeName {
          name
        }
      }
      message
    }
  }
`;

// to change the pending status of merchant for pending approval page

export const CHANGE_MERCHANT_STATUS = gql`
  mutation MyMutation($merchantId: AWSJSON!, $merchantStatusDetails: AWSJSON!) {
    ecsChangeStatusMerchant(
      pathParameters: $merchantId
      queryStringParameters: $merchantStatusDetails
    ) {
      code
      message
    }
  }
`;

export const MERCHANT_INVITE = gql`
  mutation MyMutation($mailsData: AWSJSON!,$queryparams:AWSJSON!) {
    ecsInviteMerchantUser(queryStringParameters: $queryparams,body:$mailsData)
  }
`;

export const DELETE_MERCHANT_ROLE = gql`
  mutation MyMutation($roleDetails: AWSJSON!) {
    deleteMerchantRole(body: $roleDetails) {
      code
      message
    }
  }
`;

export const DELETE_ADMIN_ROLE = gql`
  mutation MyMutation($roleDetails: AWSJSON!) {
    deleteOperatorRole(pathParameters: $roleDetails) {
      code
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation MyMutation($updateUserData: String!, $currentUserEmail: AWSJSON!) {
    ecsUpdateUser(
      body: $updateUserData
      queryStringParameters: $currentUserEmail
    ) {
      code
      data {
        createDate
        defaultShop
        email
        lastLoginDate
        lastUpdateDate
        lastUpdatedBy
        merchantIds
        merchantRoles {
          createDate
          isDefault
          lastUpdateDate
          lastUpdatedBy
          merDataInsightsAccess {
            exportGiroReport
            exportInventoryReport
            exportOrderReport
            exportSalesReport
            viewDashboard
          }
          merMyAccountAccess {
            addNewUsers
            createNewRoles
            editBusinessInfo
            editFinanceInfo
            editLeaseInfo
            editUserRoles
            viewBusinessInfo
            viewFinanceInfo
            viewLeaseInfo
            viewLogisticsInfo
          }
          merOrderAccess {
            editOrders
            exportOrders
            viewOrders
            viewReturns
          }
          merProductAccess {
            addAndEditProducts
            deactivateProducts
            deleteProducts
            exportProducts
            viewProducts
          }
          merchantId
          name
          roleId
          roleType
          status
        }
        mobile
        name
        operatorRoles {
          createDate
          isDefault
          lastUpdateDate
          lastUpdatedBy
          merchantId
          name
          opAdministrationAccess {
            addNewOperatorUsers
            deactivateMerchants
            deactivateOperators
            exportListOfAllUsers
            viewPlatformActivitySubModule
            viewUserManagementSubModule
            editOperatorRolesAndPermission
            editMerchantRolesAndPermission
          }
          opDataInsightsAccess {
            exportEncryptedGiro
            exportGiroReport
            exportInventoryReport
            exportOrderReport
            exportSalesReport
            exportVoucherUsageReport
            viewDashboard
          }
          opMerchantManagementAccess {
            businessApprove
            editMerchantBusinessInfo
            editMerchantFinanceInfo
            editMerchantLeaseInfo
            editMerchantLogisticsInfo
            exportMerchantInfo
            financeApprove
            leasingApprove
            merchantApprove
            merchantInvite
            suspendOrLiveMerchant
            viewMerchantAccountInfo
            viewPendingApproval
          }
          opOrderAccess {
            editAllOrders
            exportOrders
            manageRefunds
            manageReturns
            viewAllOrders
            viewReturns
          }
          opProductAccess {
            approveRejectProducts
            deactivateProducts
            deleteProducts
            editAllProducts
            exportProducts
            viewAllProducts
          }
          roleId
          roleType
          status
        }
        linkedMerchants {
          merchantId
          merchantName
          role
          status
        }
        roleIdList
        roleType
        status
        userid
      }
      message
    }
  }
`;

//product

export const CREATE_SINGLE_PRODUCT = gql`
  mutation MyMutation($productData: AWSJSON!, $requiredDetails: AWSJSON!) {
    ecsCreateIndividualProduct(
      body: $productData
      queryStringParameters: $requiredDetails
    ) {
      code
      data
      message
    }
  }
`;

export const UPLOAD_PRODUCT_IMAGE = gql`
  mutation MyMutation($merchantDetails: AWSJSON!, $imageData: String!) {
    ecsProductUploadImage(
      queryStringParameters: $merchantDetails
      body: $imageData
    ) {
      message
      code
      data
    }
  }
`;
export const UPDATE_PRODUCT_STATUS = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsUpdateProductStatus(body: $body) {
      code
      message
      data {
        productName
        reason
        success
      }
    }
  }
`;

export const GENERATE_BULK_PRODUCT_TEMPLATE = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsGenerateTemplateProduct(body: $body) {
      code
      data
      message
    }
  }
`;

export const UPLOAD_BULK_PRODUCT_TEMPLATE = gql`
  mutation MyMutation($body: String!, $queryStringParameters: AWSJSON!) {
    ecsBulkUploadXlsFile(
      queryStringParameters: $queryStringParameters
      body: $body
    ) {
      message
      code
      data
    }
  }
`;

export const UPDATE_SINGLE_PRODUCT = gql`
  mutation MyMutation($productData: AWSJSON!, $requiredDetails: AWSJSON!) {
    ecsUpdateIndividualProduct(
      queryStringParameters: $requiredDetails
      body: $productData
    ) {
      code
      message
      data
    }
  }
`;

//ORDERS

export const GET_ALL_ORDERS = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsViewAllOrder(body: $body) {
      pageSize
      page
      total
      message
      code
      data {
        orderId
        deliveryMode
        customerType
        collectionPoint
        deliveryDate
        orderStatus
        merchantId
        flightNum
        hasCancellations
        promotionCode
        orderType
        merchantName
        destination
        flightDateTime
        shippingMethod
        orderCreationDatetime
        lastUpdatedDatetime
        isGHROrder
        terminal
        pickUpByCourier
        carrierName
        deliveredByCourier
        orderDetails {
          orderId
          offerId
          productId
          productImage
          productName
          productSKU
          productMP
          quantity
          retailPrice
          amountPaid
          productStatus
          productHasCancellation
          originalQuantity
          cancelledInformation {
            cancelledBy
            cancelledQuantity
            rejectReason {
              code
              reason
            }
          }
        }
      }
    }
  }
`;
export const GENERATE_BULK_MANAGE_PRODUCT_TEMPLATE = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsGenerateBulkUpdateProducts(body: $body) {
      code
      data
      message
    }
  }
`;
export const PRINT_DOCUMENTS = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsPrintDocuments(body: $body) {
      code
      message
      data
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsCancelOrder(body: $body) {
      code
      data
      message
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsUpdateOrderStatus(body: $body) {
      code
      data
      message
    }
  }
`;

export const UPDATE_ORDER_DETAILS = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsUpdateOrderDetails(body: $body) {
      code
      data
      message
    }
  }
`;

export const EXPORT_ORDERS = gql`
  mutation MyMutation($body: AWSJSON!) {
    ecsExportOrders(body: $body) {
      code
      data
      message
    }
  }
`;
