import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    login: false,
    userId: null,
    roomId: "",
  },
  reducers: {
    Login: (state, action) => {
      state.login = true;
      state.userId = action.payload.userId;
    },
    Logout: (state) => {
      state.login = false;
    },
    Joingame: (state, action) => {
      console.log(action.payload);
      state.roomId = action.payload.roomId;
    },
  },
});

export const { Login, Logout, Joingame } = sessionSlice.actions;

export default sessionSlice.reducer;
