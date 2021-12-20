import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    login: false,
    id: null,
  },
  reducers: {
    Login: (state, action) => {
      state.login = true;
      state.id = action.payload.id;
    },
    Logout: (state) => {
      state.login = false;
    },
  },
});

export const { Login, Logout } = sessionSlice.actions;

export default sessionSlice.reducer;
