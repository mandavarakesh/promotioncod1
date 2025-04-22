import { createSlice } from "@reduxjs/toolkit";

export const SECTION = {
  GENERIC: 0,
  VARIANT: 1,
  CATEGORY: 2,
};

const initialState = {
  showSection: SECTION.GENERIC,
  genericSectionValues: "",
  variantSectionValues: "",
  categorySectionValues: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setShowSection: (state, action) => ({
      ...state,
      showSection: action.payload,
    }),
    setGenericSectionValues: (state, action) => ({
      ...state,
      genericSectionValues: action.payload,
    }),
    setVariantSectionValues: (state, action) => ({
      ...state,
      variantSectionValues: action.payload,
    }),
    setCategorySectionValues: (state, action) => ({
      ...state,
      categorySectionValues: action.payload,
    }),
    resetProductData: () => ({
      showSection: SECTION.GENERIC,
      genericSectionValues: "",
      variantSectionValues: "",
      categorySectionValues: "",
    }),
  },
});

export const {
  setShowSection,
  setGenericSectionValues,
  setVariantSectionValues,
  setCategorySectionValues,
  resetProductData,
} = productSlice.actions;

export default productSlice.reducer;
