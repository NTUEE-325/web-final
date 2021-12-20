import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import express from "express";
import init from "./init.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const db = mongoose.connection;

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log("MongoDB connected");
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("getMessage", (arg) => {
      console.log(arg);
    });
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log("successful join room");
      io.emit("getMessage", "successful add room" + roomId);
    });
    socket.on("queryGame", (gameId) => {
      console.log("data queried");
    });
    socket.on("startGame", (option) => {
      console.log("game has started");
      const data = init(option);
      io.emit("gameDetail", data);
    });
    socket.on("disconnect", (socket) => {
      console.log("a user disconnected");
    });
  });
  const PORT = process.env.port || 5000;
  server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
  });
});
