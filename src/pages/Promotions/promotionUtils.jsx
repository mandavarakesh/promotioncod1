const isObject = (v) => {
  return v !== null && typeof v === "object" && !Array.isArray(v);
};

export const extractFormFields = (subForms = {}, requiredKeyForForm = "") => {
  const availableFormsKeys = Object.keys(subForms);
  if (availableFormsKeys.length <= 0) return [];
  return availableFormsKeys.map((subFormKey) => {
    const formValues = {
      [requiredKeyForForm]: subFormKey,
      fields: [],
    };

    const miniSubForm = subForms[subFormKey] ?? {};
    const miniSubFormKeys = Object.keys(miniSubForm);
    if (miniSubFormKeys.length <= 0) return [];

    const linkedKeyNames = miniSubFormKeys.map((item) => {
      if (isObject(miniSubForm[item])) {
        const keyObj = miniSubForm[item] ?? {};
        return Object.keys(keyObj).length > 0 ? Object.keys(keyObj)[0] : "";
      }
      return "";
    });

    const fieldValuesArray = miniSubFormKeys.map((item) => {
      if (linkedKeyNames.includes(item)) {
        return null;
      }
      if (!isObject(miniSubForm[item])) {
        return {
          fieldId: item,
          value: miniSubForm[item] ?? "",
          operator: "",
        };
      } else {
        const keyObj = miniSubForm[item] ?? {};
        const keyName =
          Object.keys(keyObj).length > 0 ? Object.keys(keyObj)[0] : "";
        return {
          fieldId: item,
          value: keyObj[keyName] ?? "",
          operator: miniSubForm[keyName] ?? "",
        };
      }
    });

    const modifiedFieldValues = fieldValuesArray.filter(Boolean);
    formValues.fields = modifiedFieldValues;
    return formValues;
  });
};
