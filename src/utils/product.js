import dayjs from "dayjs";
import * as yup from "yup";

export const PRICE_INITIALS = {
  price: null,
  startDate: null,
  endDate: null,
};

export const CHANNEL_PRICE = {
  price: null,
  channelPrice: null,
  customerType: null,
  startDate: null,
  endDate: null,
};

export const CHANNEL_PRICE_INITIALS = [CHANNEL_PRICE];

export const UNSAVED_CHANGES_MSG = {
  heading: "Attention:",
  message:
    "You are about to leave this page. All changes will be lost. Do you really want to leave without submitting?",
  isSuccess: false,
};

export const SECTION = {
  GENERIC: 0,
  VARIANT: 1,
  CATEGORY: 2,
};

export const CORE_ATTRIBUTES = {
  PRODUCT_IMAGES: "Product Images",
  UNIQUE: "Unique Attribtues",
  SWATCH_IMAGE: "Swatch Image",
  OTHER_ATTRIBUTES: "Other Attributes",
  PRODUCT_DESCRIPTION: "Product Description",
  AWARDS: "Awards",
  VARIANT: "Varaint",
  WITHOUT_SECTION: "coreSection",
  VIDEOS: "Videos",
  STOREFRONT_DISPLAY: "Storefront Display",
};

export const VARIANT_ATTRIBUTES = {
  WITHOUT_SECTION: "variantSection",
};

export const CATEGORY_ATTRIBUTES = {
  WITHOUT_SECTION: "categorySection",
};

export const multiSelectListStaticFields = ["customerType"];

export const SERVER_ERROR_MSG = {
  heading: "Attention:",
  message: "Something went wrong on server. Please try again later.",
  isSuccess: false,
};

const gstFields = [
  "gstAbsorbedForTraveller",
  "gstAbsorbedForNonTraveller",
  "dutyAbsorbedForTraveller",
  "dutyAbsorbedForNonTraveller",
  "isLockerRestricted",
];

export const getDefaultValues = (array, dontInculdeValue = false) => {
  if (!Array.isArray(array) || array.length <= 0) return {};
  return array.reduce((acc, item) => {
    const fieldType = item.customField.fieldType;
    const refId = item.customField.refId;
    switch (fieldType) {
      case "BOOLEAN":
        if (gstFields?.includes(refId)) {
          acc[refId] = item?.value;
        } else {
          acc[refId] = dontInculdeValue ? false : item?.value ?? false;

        }
        break;
      case "LIST_MULTIPLE_VALUES":
      case "INTEGER":
      case "DATE":
      case "DATETIME":
        acc[refId] = dontInculdeValue ? null : item?.value ?? null;
        break;
      default:
        acc[refId] = dontInculdeValue ? "" : item?.value ?? "";
        break;
    }
    return acc;
  }, {});
};

export const getFilteredAttributesWithSection = (array, emptySection) => {
  if (!Array.isArray(array) || array.length <= 0) return {};
  return array.reduce((acc, attribute) => {
    const objKey = attribute.customField.section?.trim() || emptySection;
    if (!acc[objKey]) {
      acc[objKey] = [];
    }
    acc[objKey].push(attribute);
    return acc;
  }, {});
};

export const separateAttributesByCategory = (
  variants,
  offerFields,
  variantFields
) => {
  return variants.map((variant) => {
    const coreAttributes = {};
    const variantAttributes = {};
    const offerAttributes = {};

    for (const key in variant) {
      if (offerFields.includes(key)) {
        offerAttributes[key] = variant[key];
      } else if (variantFields.includes(key)) {
        variantAttributes[key] = variant[key];
      } else {
        coreAttributes[key] = variant[key];
      }
    }

    return {
      ...variantAttributes,
      core: coreAttributes,
      offer: offerAttributes,
    };
  });
};

export const offerFieldsToFilter = [
  "price",
  "stockQuantity",
  "minQuantityAlert",
  "collectionType",
  "deliveryType",
  "dutyAmount",
  "isLagItem",
  "lagVolume",
  "outOfStockQuantity",
  "leadTimeToShip",
  "gstAbsorbedForTraveller",
  "gstAbsorbedForNonTraveller",
  "dutyAbsorbedForTraveller",
  "dutyAbsorbedForNonTraveller",
  "staffOfferOnly",
  "shipmentType",
  "isLandsideCollection",
  "orderLeadTime",
  "offerSku",
  "channelPrice",
  "discount",
  "staffDiscount",
  "oddEligible",
  "availablePriceEndDate",
  "availablePriceStartDate",
  "rentalDeptCode",
  "isLockerRestricted",
];

export const getCustomFieldRefIds = (items) => {
  return (
    items?.map((item) => {
      return item.customField.refId;
    }) || []
  );
};

export const applyTextValidation = (
  schema,
  mandatoryType,
  validation,
  isItCategory
) => {
  if (
    validation &&
    Object.keys(validation).length === 0 &&
    mandatoryType === "REQUIRED"
  ) {
    schema = schema.required("Field is required");
    return schema;
  }

  if (validation?.type !== "textvalidation" || isItCategory) {
    return yup.string().nullable();
  }

  if (mandatoryType === "REQUIRED") {
    schema = schema.required("Field is required");
    if (validation.minLength) {
      schema = schema.min(
        validation.minLength,
        `Must be at least ${validation.minLength} characters`
      );
    }
    if (validation.maxLength) {
      schema = schema.max(
        validation.maxLength,
        `Max ${validation.maxLength} characters allowed`
      );
    }
  } else if (validation.minLength || validation.maxLength) {
    schema = schema.test({
      name: "length-validation",
      message: "Invalid length",
      test: (value) =>
        !value ||
        ((!validation.minLength || value.length >= validation.minLength) &&
          (!validation.maxLength || value.length <= validation.maxLength)),
    });
  }
  return schema;
};

const isDateValidationEmpty = (validation) => {
  const { requiredWhen, isStartDate, isEndDate, startDateRef, minDate } =
    validation;
  return (
    !requiredWhen && !isStartDate && !isEndDate && !startDateRef && !minDate
  );
};

const applyDateValidation = (schema,mandatoryType, validation) => {
  return schema.test({
    name: 'date_validation',
    test: (value,ctx) => {
      if(value===null||value===undefined||value===''){
        return true;
      }

      if(!dayjs(value).isValid()){
        return ctx.createError(new yup.ValidationError("Invalid Date"));
      }

      if (isDateValidationEmpty(validation) && mandatoryType !== "REQUIRED") {
        return true; 
      }

      if (isDateValidationEmpty(validation) && mandatoryType === "REQUIRED") {
        return ctx.createError(new yup.ValidationError("Field is Required")); 
      }

      if (validation.isStartDate) {
        const modifiedMinDate = validation.minDate ? validation.minDate : "2000-01-01T00:00:00";
        const isValid = value ? dayjs(value).isAfter(dayjs(modifiedMinDate)) : true;
        if (!isValid) {
          return ctx.createError(new yup.ValidationError(`Date must be after ${dayjs(modifiedMinDate).format("MM-DD-YYYY")}`));
        }
      }

      if (validation.isEndDate) {
        const startFrom = ctx.resolve(yup.ref(validation.startDateRef));
        const isValid = !startFrom || !value || new Date(value) >= new Date(startFrom);
        if (!isValid) {
          return ctx.createError(new yup.ValidationError("End date should be after the start date"))
        }
      }
      return true;
    }
  });
};

const applyRequiredValidation = (schema, mandatoryType, validation) => {
  if (validation?.requiredWhen) {
    return schema.when([validation.requiredWhen], {
      is: (value) => !!value,
      then: () => schema.required("Field is required"),
      otherwise: () => schema,
    });
  }
  if (mandatoryType === "REQUIRED") {
    return schema.required("Field is required");
  } else {
    return schema;
  }
};

const applyNumberValidation = (schema, mandatoryType, validation) => {
  if (validation?.requiredWhen) {
    return schema.when([validation.requiredWhen], {
      is: (value) => !!value,
      then: () =>
        schema.required("Field is required").typeError("Invalid Input"),
      otherwise: () => schema.nullable().typeError("Invalid Input"),
    });
  }
  if (mandatoryType === "REQUIRED") {
    return schema.required("Field is required").typeError("Invalid Input");
  } else {
    return schema.nullable().typeError("Invalid Input");
  }
};

const applyListValidation = (schema, mandatoryType, validation) => {
  let newSchema = schema;
  if (validation.requiredWhen) {
    return schema.when(validation.requiredWhen, {
      is: (value) => !!value,
      then: () => schema.required("Field is required"),
      otherwise: () => schema,
    });
  }
  if (mandatoryType === "REQUIRED") {
    return newSchema.required("Field is required");
  } else {
    return newSchema;
  }
};

const applyMultiListValidationForText = (schema, mandatoryType, validation) => {
  if (mandatoryType === "REQUIRED") {
    return schema.required("Field is required");
  } else if (validation.requiredWhen) {
    return schema.when([validation.requiredWhen], {
      is: (value) => !!value,
      then: () => schema.required("Field is required"),
      otherwise: () => schema,
    });
  } else {
    return schema;
  }
};

const isValidStringArray = (value) => {
  if (!Array.isArray(value)) {
    return value !== "" && value !== null;
  }
  return (
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
};

const applyMultiListValidationForArray = (
  schema,
  mandatoryType,
  validation
) => {
  let newSchema = schema;
  if (mandatoryType === "REQUIRED") {
    return newSchema
      .test({
        name: "has-strings",
        message: "Invalid Selection",
        test: isValidStringArray,
      })
      .required("Field is required");
  } else if (validation.requiredWhen) {
    return newSchema.when([validation.requiredWhen], {
      is: (value) => !!value,
      then: () =>
        newSchema
          .test({
            name: "has-strings",
            message: "Invalid Selection",
            test: isValidStringArray,
          })
          .required("Field is required"),
      otherwise: () => newSchema,
    });
  } else {
    return newSchema;
  }
};

export const createTextSchema = () => {
  return yup.string().nullable().trim().typeError("Invalid Input");
};

const generateFieldSchema = (fieldInfo) => {
  const {
    deleted,
    refId: fieldName,
    fieldType,
    validation: customValidation,
    mandatoryType,
  } = fieldInfo.customField;
  const validation = customValidation || {};
  const isItCategory = fieldName?.endsWith("category");

  let fieldSchema = yup.string().nullable(); // Default schema

  const restrictedWords = [
    /\bcd\b/,

    /taskkill/,

    /cmd/,

    /\bdyke\b/,

    /\bass\b/,

    /\btwat\b/,

    /\bstupid\b/,

    /fuck(?:er)?/,

    /\bdumb\b/,

    /mother(?:fuck(?:er)?|\bwhore\b)/,

    /\bfag\b/,

    /jerk\s?off/,

    /\bwhat\s+the\s+fuck\b/,

    /\btranny\b/,

    /\bcunt\b/,

    /prostitute/,

    /\bnigga\b/,

    /f\.u\.c\.k/,

    /\bgoddamn\b/,

    /\bidiot\b/,

    /\bnigger\b/,

    /\bwtf\b/,

    /\bdamn\b/,

    /\bah\s+gua\b/,

    /\bshit\b/,

    /asshole/,

    /\bhoe\b/,

    /ipconfig/,
  ];

  const restrictedWordsRegexPattern = `^((?!.*(${restrictedWords
    .map((word) => word.source)
    .join("|")})).|\\s)*$`;

  const restrictedWordsRegex = new RegExp(restrictedWordsRegexPattern, "i");

  if (!deleted) {
    const validateLength = (value, limit) => {
      if (value === undefined || value === null || isNaN(value)) {
        return true;
      }
      return value.toString().length <= limit;
    };

    switch (fieldType) {
      case "TEXT":
        fieldSchema = applyTextValidation(
          createTextSchema(),
          mandatoryType,
          validation,
          isItCategory
        );
        break;
      case "LONG_TEXT":
        fieldSchema = applyTextValidation(
          yup
            .string()
            .trim()
            .typeError("Invalid Input")
            .matches(restrictedWordsRegex, "Invalid Input"),

          // yup.string().transform(removeLineBreaks).typeError("Invalid Input")
          // .matches(restrictedWordsRegex, "Invalid Input"),
          mandatoryType,
          validation,
          isItCategory
        );
        break;
      case "MEDIA":
        fieldSchema = applyRequiredValidation(
          yup.string().typeError("Invalid Input"),
          mandatoryType,
          validation
        );
        break;
      case "INTEGER":
        fieldSchema = applyNumberValidation(
          yup
            .number()
            .nullable()
            .typeError("Invalid Input")
            .transform((value, originalValue) => {
              return originalValue === "" ? null : value;
            })
            .test(
              "len",
              "Input Length Exceeds Limit. Please Limit to 10 Characters.",
              (val) => validateLength(val, 10)
            ),
          mandatoryType,
          validation
        );
        break;
      case "BOOLEAN":
        fieldSchema = applyRequiredValidation(
          yup.boolean().nullable().typeError("Invalid Input"),
          mandatoryType,
          validation
        );
        break;
      case "DATE":
      case "DATETIME":
        fieldSchema = applyDateValidation(
          yup.string().nullable(),
          mandatoryType,
          validation
        );
        break;
      case "LIST":
        fieldSchema = applyListValidation(
          yup.string().nullable().typeError("Invalid Selection"),
          mandatoryType,
          validation
        );
        break;
      case "LIST_MULTIPLE_VALUES":
        if (multiSelectListStaticFields.includes(fieldName)) {
          fieldSchema = applyMultiListValidationForArray(
            yup.array().nullable().of(yup.string()),
            mandatoryType,
            validation
          );
        } else {
          fieldSchema = applyMultiListValidationForText(
            yup.string().nullable().typeError("Invalid Selection"),
            mandatoryType,
            validation
          );
        }
        break;
    }
  }

  return fieldSchema;
};

export const generateYupSchema = (jsonObject) => {
  const schemaFields = {};

  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      jsonObject[key].forEach((item) => {
        schemaFields[item.customField.refId] = generateFieldSchema(item);
      });
    }
  }

  return schemaFields;
};

export const sortCategorysBySelectedSlug = (slug, array = []) => {
  return array.slice().sort((a, b) => {
    if (a.slug === slug) {
      return -1;
    } else if (b.slug === slug) {
      return 1;
    } else {
      return 0;
    }
  });
};
