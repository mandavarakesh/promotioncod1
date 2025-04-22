import { gql } from "graphql-tag";

//for getting the user who is going to login

export const GET_USER_BY_EMAIL = gql`
  query MyQuery($email: AWSJSON!) {
    getUserByEmail(pathParameters: $email) {
      code
      message
      data {
        userid
        name
        email
        mobile
        roleType
        defaultShop
        status
        lastLoginDate
        lastUpdateDate
        createDate
        lastUpdatedBy
        linkedMerchants {
          merchantId
          merchantName
          role
          status
        }
        operatorRoles {
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
          roleId
          roleType
          status
          name
          merchantId
          lastUpdatedBy
          lastUpdateDate
          isDefault
          createDate
        }
        merchantRoles {
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
          status
          roleType
          roleId
          createDate
          isDefault
          lastUpdateDate
          lastUpdatedBy
        }
        merchantIds
        roleIdList
      }
    }
  }
`;

//for getting all the user by role type

export const GET_USERS_BY_ROLETYPE = gql`
  query MyQuery($userDetails: AWSJSON!) {
    osGetUsers(queryStringParameters: $userDetails) {
      code
      data {
        userid
        name
        email
        mobile
        roleType
        defaultShop
        status
        lastLoginDate
        lastUpdateDate
        createDate
        lastUpdatedBy
        merchantIds
        roleIdList
        linkedMerchants {
          merchantId
          merchantName
          role
          status
        }
        merchantRoles {
          roleId
          merchantId
          name
          status
          lastUpdateDate
          createDate
          isDefault
          lastUpdatedBy
          roleType
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
        operatorRoles {
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
      }
      message
      page
      total
      pageSize
    }
  }
`;

// for all merchants in all merchants page with filter

export const GET_ALLMERCHANTS = gql`
  query MyQuery($filterData: AWSJSON!) {
  osGetMerchants(queryStringParameters: $filterData) {
    code
    message
    page
    pageSize
    total
    data {
      accountManager
      accountName
      accountNumber
      applicationReferenceNumber
      arrival
      bankAdditionalAddress
      bankCode
      bankDetailsAttachment
      bankName
      branchCode
      businessInfoRejectedReason
      businessInfoStatus
      businessRegistrationNumber
      category
      closedFrom
      closedTo
      companyAddress {
        businessInfoEmail
        city
        companyAddress1
        companyAddress2
        contactNumber
        contactPersonFirstName
        contactPersonLastName
        country
        faxNumber
        postalCode
      }
      companyName
      concessionaireCode
      country
      createDate
      dateOfSuspension
      dcaFile
      dcaFileStatus
      dcaRejectedReason
      ddaFile
      ddaFileStatus
      ddaRejectedReason
      deliveryFee
      deliveryMessage
      deliveryMode
      deliverySLA
      departure
      departureOrderLeadTime
      description
      dropshipType
      dutyFreeTenant
      faxNo
      financeEmail
      financeRejectedReason
      financeStatus
      foreignBankAccount
      fulfilmentArrival
      fulfilmentDeparture
      fulfilmentLandside
      fulfilmentNTHomeDel
      fulfilmentTravellerHomeDel
      gstAbsorptionNonTraveller
      gstAbsorptionTraveller
      gstNumber
      gstRegisteredEntity
      isGHR
      jewelTenant
      landside
      lastUpdateDate
      lastUpdatedBy
      leaseInfoStatus
      leaseRejectedReason
      liquidMID
      logisticsContactNumber
      logisticsEmail
      logo
      merchantClassification
      merchantId
      merchantRejectedReason
      merchantStatus
      merchantType
      minSpendForFreeDelivery
      nonOperatingConfigured
      nonOperatingEndDay
      nonOperatingEndTime
      nonOperatingOrderLeadTime
      nonOperatingStartDay
      nonOperatingStartTime
      oddEligible
      opsContactFirstName
      opsContactLastName
      opsContactNumber
      opsMailingList
      orderMailingList
      payment2c2pSubMID
      paymentCurrency
      pickupSlotEndTime
      pickupSlotStartTime
      postalCode
      productMailingList
      publicHolidaysApplicable
      rentalDeptCode
      reportName
      shipmentTypeAirport
      shipmentTypeSgDel
      shippingFeeToCAG
      storeName {
        lang {
          en {
            address
            name
          }
          zh {
            address
            name
          }
        }
        name
      }
      suspendReason
      suspendedAccount
      swiftCode
      tenancyEndDate
      tenancyStartDate
      tenantAgreementReference
      tenantLmsId
      wareHousePickupAddress1
      wareHousePickupAddress2
    }
  }
}
`

export const GET_ALLMERCHANT_NAMES = gql`
  query MyQuery($filterData: AWSJSON!) {
    getMerchantsByGSI(queryStringParameters: $filterData) {
      lastEvaluatedKey
      code
      message
      pageSize
      data {
        merchantId
        storeName {
          name
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query MyQuery {
    ecsGetCategories {
      code
      data
      message
    }
  }
`;

export const GET_BRANDS = gql`
  query MyQuery($filterData: AWSJSON!) {
    ecsGetBrands(queryStringParameters: $filterData) {
      page
      pageSize
      total
      code
      data {
        slug
        lang {
          en {
            name
          }
          zh {
            name
          }
        }
        deleted
      }
      message
    }
  }
`;

//for getting the roles

export const GET_MERCHANTS_ROLES = gql`
  query MyQuery($roleBody: AWSJSON!) {
    getMerchantRoles(queryStringParameters: $roleBody) {
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
      page
      pageSize
      total
    }
  }
`;

export const GET_OPERATOR_ROLES = gql`
  query MyQuery($pagination: AWSJSON!) {
    getOperatorRoles(queryStringParameters: $pagination) {
      code
      message
      page
      pageSize
      total
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
    }
  }
`;

// for getting the pending merchants

export const GET_PENDING_MERCHANTS = gql`
  query MyQuery($pagination: AWSJSON!) {
    getPendingMerchants(queryStringParameters: $pagination) {
      code
      message
      page
      pageSize
      total
      data {
        merchantId
        storeName {
          name
        }
        createDate
        merchantStatus
      }
    }
  }
`;

export const GET_USERS_BY_MERCHANTID = gql`
  query MyQuery($merchantDetails: AWSJSON!) {
    getUsersByMerchantId(queryStringParameters: $merchantDetails) {
      code
      data {
        userid
        name
        email
        mobile
        roleType
        defaultShop
        status
        lastLoginDate
        lastUpdateDate
        createDate
        lastUpdatedBy
        merchantIds
        roleIdList
        merchantRoles {
          roleId
          merchantId
          name
          status
          lastUpdateDate
          createDate
          isDefault
          lastUpdatedBy
          roleType
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
        operatorRoles {
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
      }
      message
      page
      pageSize
      total
    }
  }
`;

export const GET_MERCHANT_BY_ID = gql`
  query MyQuery($merchantId: AWSJSON!) {
    getMerchantById(pathParameters: $merchantId) {
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
        # arrival
        # departure
        # landside
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

export const GET_FULFILMENT_MERCHANT_BY_ID = gql`
  query MyQuery($merchantId: AWSJSON!) {
    getMerchantById(pathParameters: $merchantId) {
      code
      message
      data {
        fulfilmentArrival
        fulfilmentLandside
        fulfilmentDeparture
        fulfilmentTravellerHomeDel
        fulfilmentNTHomeDel
      }
    }
  }
`;

export const GET_PRODUCTS_UPLOADS = gql`
  query MyQuery($data: AWSJSON!) {
    getProductUploads(queryStringParameters: $data) {
      code
      data {
        id
        userId
        uploadedBy
        status
        data
        merchantName
        merchantId
        linesWithErrors
        linesRead
        linesProcessed
        lastUpdatedTime
        fileName
        errorReportUrl
        errorLogs
        creationTime
      }
      page
      pageSize
      total
      message
    }
  }
`;

export const GET_API_TEMPLATES = gql`
  query MyQuery($data: AWSJSON!) {
    ecsIntegrationsGetEcskuView(body: $data) {
      code
      total
      message
    page 
      pageSize
      data {
        importId
        dateCreated
         errorReport
          merchantId
           data
            linesInError
             linesInPending 
             linesInSuccess 
             linesRead 
             offerDeleted
              offerInserted 
              offerUpdated
               lastModifiedDate
                status
                fileName
                merchantName 
              
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT_BY_ID = gql`
  query MyQuery($productId: AWSJSON!) {
    ecsGetViewProduct(queryStringParameters: $productId) {
      code
      data {
        merchantId
        mpNumber
        merchantName
        name

        offer {
          offerSku
          customerType
          airportCollection
          collectionType
          deliveryType

          discount {
            price
            startDate
            endDate
          }
          staffDiscount {
            price
            startDate
            endDate
          }
          channelPrice {
            price
            customerType
            channelPrice
            startDate
            endDate
          }
          dutyAbsorbedForNonTraveller
          dutyAbsorbedForTraveller
          dutyAmount
          rentalDeptCode
          gstAbsorbedForNonTraveller
          gstAbsorbedForTraveller
          availablePriceStartDate
          availablePriceEndDate
          isLagItem
          lagVolume
          isLandsideCollection
          leadTimeToShip
          isLockerRestricted
          oddEligible
          minQuantityAlert
          orderLeadTime
          outOfStockQuantity
          price
          shipmentType
          staffOfferOnly
          stockQuantity
        }
        pluCode
        productCategoryAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        productCoreAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        productImageAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        productUUID
        productVariantAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        rejectReason
        status
      }
      message
    }
  }
`;

export const GET_CATEGORY_HIERARCHIES = gql`
  query MyQuery {
    ecsGetCategoryHierarchies {
      code
      message
      data {
        slug
        status
        categoryL2 {
          slug
          status
          categoryL3 {
            slug
            status
            categories {
              slug
              status
              lang {
                code
                en {
                  name
                  errorMsg
                  toolTip
                }
                zh {
                  name
                  errorMsg
                  toolTip
                }
              }
            }
            lang {
              code
              en {
                name
                errorMsg
                toolTip
              }
              zh {
                name
                errorMsg
                toolTip
              }
            }
          }
          lang {
            code
            en {
              name
              errorMsg
              toolTip
            }
            zh {
              name
              errorMsg
              toolTip
            }
          }
        }
        lang {
          code
          en {
            name
            errorMsg
            toolTip
          }
          zh {
            name
            errorMsg
            toolTip
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_STRUCTURE = gql`
  query MyQuery($selectedCategories: AWSJSON!) {
    ecsGetProductStructure(queryStringParameters: $selectedCategories) {
      code
      data {
        l1Category
        l2Category
        l3Category
        combinedCategorySlugs
        merchantId
        productCategoryAttributes {
          customField {
            deleted
            fieldType
            id
            lang {
              code
              en {
                errorMsg
                name
                toolTip
              }
              zh {
                errorMsg
                name
                toolTip
              }
            }
            mandatoryType
            options {
              name
              seq
              value
            }
            refId
            section
            sequenceNumber
            validation {
              ... on textvalidation {
                type
                maxLength
                longText
                minLength
              }
              ... on imagevalidation {
                type
                maxSize
                acceptableFormats
              }
              ... on datevalidation {
                type
                requiredWhen
                endDateRef
                isEndDate
                isStartDate
                maxDate
                minDate
                startDateRef
              }
            }
            varient
          }
          customFieldId
          value
        }
        productCoreAttributes {
          customField {
            deleted
            fieldType
            id
            lang {
              code
              en {
                errorMsg
                name
                toolTip
              }
              zh {
                errorMsg
                name
                toolTip
              }
            }
            mandatoryType
            options {
              name
              seq
              value
            }
            refId
            section
            sequenceNumber
            validation {
              ... on textvalidation {
                type
                maxLength
                longText
                minLength
              }
              ... on imagevalidation {
                type
                maxSize
                acceptableFormats
              }
              ... on datevalidation {
                type
                requiredWhen
                endDateRef
                isEndDate
                isStartDate
                maxDate
                minDate
                startDateRef
              }
            }
            varient
          }
          customFieldId
          value
        }
        productUUID
        productVariantAttributes {
          customField {
            deleted
            fieldType
            id
            lang {
              code
              en {
                errorMsg
                name
                toolTip
              }
              zh {
                errorMsg
                name
                toolTip
              }
            }
            mandatoryType
            options {
              name
              seq
              value
            }
            refId
            section
            sequenceNumber
            validation {
              ... on textvalidation {
                type
                maxLength
                longText
                minLength
              }
              ... on imagevalidation {
                type
                maxSize
                acceptableFormats
              }
              ... on datevalidation {
                type
                requiredWhen
                endDateRef
                isEndDate
                isStartDate
                maxDate
                minDate
                startDateRef
              }
            }
            varient
          }
          customFieldId
          value
        }
      }
      message
    }
  }
`;

export const GET_PRODUCT_BY_UUID = gql`
  query MyQuery($productDetails: AWSJSON!) {
    ecsGetProduct(queryStringParameters: $productDetails) {
      code
      data {
        creationDate
        ean
        l1Category
        l2Category
        l3Category
        combinedCategorySlugs
        lastModifiedDate
        lastUpdatedBy
        merchantId
        mpNumber
        offer {
          price
          rentalDeptCode
          airportCollection
          customerType
          collectionType
          deliveryType
          discount {
            price
            startDate
            endDate
          }
          staffDiscount {
            price
            startDate
            endDate
          }
          channelPrice {
            price
            customerType
            channelPrice
            startDate
            endDate
          }

          dutyAbsorbedForNonTraveller
          dutyAbsorbedForTraveller
          dutyAmount
          exciseDutyAmount
          gstAbsorbedForNonTraveller
          gstAbsorbedForTraveller
          isLagItem
          lagVolume
          offerSku
          isLandsideCollection
          isLockerRestricted
          oddEligible
          leadTimeToShip
          minQuantityAlert
          orderLeadTime
          outOfStockQuantity
          shipmentType
          staffOfferOnly
          stockQuantity
          availablePriceStartDate
          availablePriceEndDate
        }
        pluCode
        productCategoryAttributes {
          customField {
            disabled
            deleted
            fieldType
            id
            lang {
              code
              en {
                errorMsg
                name
                toolTip
              }
              zh {
                errorMsg
                name
                toolTip
              }
            }
            mandatoryType
            options {
              name
              seq
              value
            }
            refId
            section
            sequenceNumber
            validation {
              ... on textvalidation {
                type
                maxLength
                longText
                minLength
              }
              ... on imagevalidation {
                type
                maxSize
                acceptableFormats
              }
              ... on datevalidation {
                type
                requiredWhen
                endDateRef
                isEndDate
                isStartDate
                maxDate
                minDate
                startDateRef
              }
            }
            varient
          }
          customFieldId
          value
        }
        productCoreAttributes {
          customField {
            disabled
            deleted
            fieldType
            id
            lang {
              code
              en {
                errorMsg
                name
                toolTip
              }
              zh {
                errorMsg
                name
                toolTip
              }
            }
            mandatoryType
            options {
              name
              seq
              value
            }
            refId
            section
            sequenceNumber
            validation {
              ... on textvalidation {
                type
                maxLength
                longText
                minLength
              }
              ... on imagevalidation {
                type
                maxSize
                acceptableFormats
              }
              ... on datevalidation {
                type
                requiredWhen
                endDateRef
                isEndDate
                isStartDate
                maxDate
                minDate
                startDateRef
              }
            }
            varient
          }
          customFieldId
          value
        }
        productUUID
        rejectReason
        productVariantAttributes {
          customField {
            disabled
            deleted
            fieldType
            id
            lang {
              code
              en {
                errorMsg
                name
                toolTip
              }
              zh {
                errorMsg
                name
                toolTip
              }
            }
            mandatoryType
            options {
              name
              seq
              value
            }
            refId
            section
            sequenceNumber
            validation {
              ... on textvalidation {
                type
                maxLength
                longText
                minLength
              }
              ... on imagevalidation {
                type
                maxSize
                acceptableFormats
              }
              ... on datevalidation {
                type
                requiredWhen
                endDateRef
                isEndDate
                isStartDate
                maxDate
                minDate
                startDateRef
              }
            }
            varient
          }
          customFieldId
          value
        }
        status
      }
      message
    }
  }
`;

export const GET_SINGLE_ORDER_BY_ID = gql`
  query MyQuery($orderId: AWSJSON!) {
    ecsViewOrderById(queryStringParameters: $orderId) {
      code
      message
      data {
        billingInformation {
          billerName
          billerPhoneNumber
          billerSecondaryPhoneNumber
          billingAddress
          paymentMethod
        }
        collectionPoint
        courier
        customerId
        shippingMethod
        customerType
        deliveryDate
        deliveryMode
        isGHROrder
        terminal
        pickUpByCourier
        carrierName
        deliveredByCourier
        flightNum
        flightDateTime
        noOfDeliveryBoxes
        pickUpDateFromWarehouse
        documents {
          airwayBill {
            description
            documentId
            uploadDate
            url
          }
          customerAckSlip {
            description
            documentId
            uploadDate
            url
          }
          deliveryOrder {
            description
            documentId
            uploadDate
            url
          }
          dropshipAck {
            description
            documentId
            uploadDate
            url
          }
          orderReceiptA {
            description
            documentId
            uploadDate
            url
          }
          orderReceiptB {
            description
            documentId
            uploadDate
            url
          }
        }
        hasCancellations
        lastUpdatedDatetime
        generalInformation {
          commercialNumber
          customerName
          merchantName
        }
        merchantId
        merchantName
        orderCreationDatetime
        orderDetails {
          amountPaid
          cancelledInformation {
            cancelledBy
            cancelledQuantity
            rejectReason {
              code
              reason
            }
          }
          offerId
          orderId
          originalQuantity
          productHasCancellation
          productId
          productImage
          productMP
          productName
          productSKU
          productStatus
          quantity
          retailPrice
        }
        orderId
        orderInformation {
          customerName
          email
          passportNumber
          discountAmount
          flightDateTime
          flightNumber
          destination
          terminal
          processingSubStore
          plannedDispatchedDateTime
          pickupByCourier
          deliveredByCourier
          pickupDataFromWareHouse
          noOfBoxes
          promotionDiscountAmount
          customerNumber
          customerType
          deliveryOrCollectionDateAndTime
          isGHROrder
          lmsReceiptNumber
          nationality
          orderType
          promotionCode
          orderRemarks
        }
        orderStatus
        paymentInformation {
          subTotal
          shippingFee
          merchantDiscountAmount
          platformDiscountAmount
          crPoints
          cpVouchers
          amountPaid
        }
        promotionCode
        refunds {
          products {
            productDescription
            productImage
            refundInfo {
              date
              productMp
              productSKU
              quantity
              reason
              refundId
              refundedShippingCharges
              status
              refundedAmount
            }
          }
        }
        shippingInformation {
          customerAddress
          customerName
          customerPhoneNumber
          customerSecondaryNumber
          zone
          method
          deadline
        }
        trackingOrInvoiceNumber
        trackingUrl
      }
    }
  }
`;

export const GET_LIST_ALL_PRODUCTS = gql`
  query MyQuery($requestBody: AWSJSON!) {
    ecsFilterProduct(body: $requestBody) {
      code
      data {
        merchantId
        merchantName
        creationDate
        lastModifiedDate
        mpNumber
        name
        offer {
          airportCollection
          collectionType
          deliveryType
          discount {
            price
            startDate
            endDate
          }
          staffDiscount {
            price
            startDate
            endDate
          }
          channelPrice {
            price
            customerType
            channelPrice
            startDate
            endDate
          }
          dutyAbsorbedForNonTraveller
          dutyAbsorbedForTraveller
          dutyAmount
          dutyVolume
          exciseDutyAmount
          gstAbsorbedForNonTraveller
          gstAbsorbedForTraveller
          isLagItem
          lagVolume
          isLandsideCollection
          leadTimeToShip
          isLockerRestricted
          minQuantityAlert
          offerId
          # creationDate
          # lastModifiedDate
          mpNumber
          oddEligible
          offerSku
          orderLeadTime
          outOfStockQuantity
          price
          rentalDeptCode
          shipmentType
          skuDeliveryModes
          staffOfferOnly
          state
          stockQuantity
          availablePriceStartDate
          availablePriceEndDate
        }
        pluCode
        productCategoryAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        productCoreAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        productImageAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        productUUID
        productVariantAttributes {
          code
          customFieldId
          fieldType
          label
          seq
          value
        }
        rejectReason
        status
      }
      message
      pageSize
      page
      total
    }
  }
`;

export const GET_DOWNLOAD_JOB_BY_ID = gql`
  query MyQuery($requestParams: AWSJSON!) {
    getDownloadJob(queryStringParameters: $requestParams) {
      code
      message
      data {
        jobId
        s3Url
        status
        ttl
        userId
      }
    }
  }
`;

export const GET_HOMEPAGE_COUNTS = gql`
  query MyQuery($body: AWSJSON!) {
    ecsCommonsGetCounts(queryStringParameters: $body) {
      code
      data{ merchantId newProducts toConfirmDelivery productChangesRequired pendingUpdates outOfStock readyToShip openOrders pendingApproval }
      message
    }
  }
`;

export const GET_MERCHANT_ROLE_BY_ID = gql`
  query MyQuery($pathParams: AWSJSON!) {
    getMerchantRoleById(pathParameters: $pathParams) {
      code
      data {
        status
        roleType
        roleId
        name
        merchantId
        merProductAccess {
          viewProducts
          addAndEditProducts
          deactivateProducts
          deleteProducts
          exportProducts
        }
        merOrderAccess {
          viewOrders
          editOrders
          exportOrders
          viewReturns
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
        merDataInsightsAccess {
          viewDashboard
          exportSalesReport
          exportInventoryReport
          exportOrderReport
          exportGiroReport
        }
        createDate
        isDefault
        lastUpdateDate
        lastUpdatedBy
      }
      message
    }
  }
`;

export const GET_MER_ROLES_FOR_FILTER = gql`
  query MyQuery($roleBody: AWSJSON!) {
    getMerchantRoles(queryStringParameters: $roleBody) {
      code
      data {
        name
        roleId
      }
      message
      page
      pageSize
      total
    }
  }
`;

// Getting  orders counts based on filters

export const GET_ORDERS_COUNT = gql`
  query MyQuery($body: AWSJSON!) {
    getOrderCount(queryStringParameters: $body) {
      code
      data
      message
    }
  }
`;

//query to get counts based on filters

export const GET_SUBSCRIBE_PRODUCTS_COUNT_JOB_ID = gql`
 query MyQuery($body: AWSJSON!) {
   subscribeProductCount(queryStringParameters: $body) {
     code
     data
     message
   }
 }
`;

export const GET_SPECIAL_MERCHANTS = gql`
  query MyQuery {
    ecsProductShopIds {
      code
      data
      message
    }
  }
`;

// Query for Refund Codes

export const GET_REFUND_CODES = gql`
  query MyQuery{
    ecsGetRefundCodes {
      code
      data
      { code
         name 
         seq }
      message
    }
  }
`;

// Get shipping Methods

export const GET_SHIPPING_METHODS = gql`
  query MyQuery{
    ecsGetShippingCodes {
      code
      data
      { code
         name 
         seq }
      message
    }
  }
`;


export const VALIDATE_USER = gql`
query MyQuery($userDetails: AWSJSON!) {
  ecsUserValidate(queryStringParameters: $userDetails ) {
    code
    message
    data {
      valid
      userName
    }
  }
}
`

export const GET_ORDER_HISTORY = gql`
query MyQuery($orderId: AWSJSON!) {
  getSystemUpdates(queryStringParameters: $orderId) {
    code
    message
    data {
      action
      backendAction
      creationDateTime
      details {
        modificationSubHead
        subDetails {
          field
          from
          to
        }
      }
      ipAddress
      isDisplay
      linkedRawRecordId
      orderId
      role
      shopId
      uniqueId
      urlPath
      userEmail
    }
  }
}
`