import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage } from "../utils/persistentData";

const initialState = {
  user: getDataFromLocalStorage("current_user_data"),
  selectedRole: {},
  selectedUser: {},
  breadcrumbModifiers: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    setSelectedRole: (state, action) => ({
      ...state,
      selectedRole: action.payload,
    }),
    setSelectedUser: (state, action) => ({
      ...state,
      selectedUser: action.payload,
    }),
    setBreadcrumbModifiers: (state, action) => ({
      ...state,
      breadcrumbModifiers: action.payload
    }),
    resetUser: () => ({ user: "" }),
  },
});

export const {
  setUser,
  resetUser,
  setSelectedRole,
  setSelectedUser,
  setBreadcrumbModifiers
} = userSlice.actions;

export default userSlice.reducer;
