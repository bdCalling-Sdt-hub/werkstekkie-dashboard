import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedUser(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateToken: (state,action)=>{
      state.token = action.payload.token
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    logoutUser(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loggedUser, updateUser, logoutUser, updateToken } = authSlice.actions;

export default authSlice.reducer;