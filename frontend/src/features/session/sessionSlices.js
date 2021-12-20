import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    login: false,
    userId: null,
  },
  reducers: {
    Login: (state, action) => {
      state.login = true;
      state.userId = action.payload.userId;
    },
    Logout: (state) => {
      state.login = false;
    },
  },
});

export const { Login, Logout } = sessionSlice.actions;

export default sessionSlice.reducer;
