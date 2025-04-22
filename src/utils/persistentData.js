const storeDataToLocalStorage = (key, value) => {
  try {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      const serializeValue = JSON.stringify(value);
      localStorage.setItem(key, serializeValue);
    }
  } catch (e) {
    console.error("Error storing state on local storage", e);
  }
};

const getDataFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (
      (value?.startsWith("{") && value?.endsWith("}")) ||
      (value?.startsWith("[") && value?.endsWith("]"))
    ) {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (e) {
    console.log("Error retrieving state from local storage", e);
  }
};

const removeKeyFromLocalStorage = (key) => {
  try {
    if (Array.isArray(key)) {
      key.forEach((eachKey) => {
        localStorage.removeItem(eachKey);
      });
    }
    localStorage.removeItem(key);
  } catch (e) {
    console.log("Error deletion state from local storage", e);
  }
};

const clearDataFromLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (e) {
    console.log("Error clear state from local storage", e);
  }
};

export {
  storeDataToLocalStorage,
  getDataFromLocalStorage,
  removeKeyFromLocalStorage,
  clearDataFromLocalStorage,
};
