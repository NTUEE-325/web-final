import { createSlice } from "@reduxjs/toolkit";
import webSocket from "socket.io-client";
import dotenv from "dotenv-defaults";

dotenv.config();

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    ws: null,
    gameId: "",
    playerDeck: [],
    discardPlayerDeck: [],
    virusDeck: [],
    discardvirusDeck: [],
    activeVirus: [],
    virus1: Array(48).fill(0),
    virus2: Array(48).fill(0),
    virus3: Array(48).fill(0),
    virus4: Array(48).fill(0),
  },
  reducers: {
    connectWebSocket: (state, action) => {
      state.ws = webSocket(process.env.WEBSOCKET_URL);
      console.log("webSocket connected");
      console.log(state.ws);
    },
    initWebSocket: (state) => {
      state.ws.on("getMessage", (msg) => {
        console.log(msg);
      });
      state.ws.on("gameDetail", (data) => {
        state.gameId = data.id;
        state.playerDeck = data.playerDeck;
        state.discardPlayerDeck = data.discardplayerDeck;
        state.virusDeck = data.virusDeck;
        state.discardVirusDeck = data.discardvirusDeck;
        state.virus1 = data.virus1;
        state.virus2 = data.virus2;
        state.virus3(data.virus3);
        state.virus4(data.virus4);
      });
    },
    joinRoom: (state, action) => {
      state.ws.emit("joinRoom", {
        userId: action.payload.gameId,
        gameId: action.payload.gameId,
      });
    },
  },
});

export const { connectWebSocket, initWebSocket, joinRoom } = gameSlice.actions;

export default gameSlice.reducer;
