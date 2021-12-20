import { createSlice } from "@reduxjs/toolkit";
import webSocket from "socket.io-client";

const WEBSOCKET_URL = "http://localhost:5000";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    ws: null,
    roomId: "",
  },
  reducers: {
    connectWebSocket: (state) => {
      state.ws = webSocket(WEBSOCKET_URL);
    },
    initWebSocket: (state) => {
      state.ws.on("getMessage", (msg) => {
        console.log(msg);
      });
      state.ws.on("gameDetail", (data) => {
        dispatch();
      });
    },
    joinRoom: (state, action) => {
      state.ws.emit("joinRoom", action.payload.roomId);
    },
    queryGame: (state, action) => {
      state.ws.emit("queryGame", action.payload.gameId);
    },
    startGame: (state, action) => {
      state.ws.emit("startGame", action.payload.option);
    },
  },
});

export const { Login, Logout } = socketSlice.actions;

export default socketSlice.reducer;
