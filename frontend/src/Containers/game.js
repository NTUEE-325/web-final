import React, { useEffect } from "react";
import useGame from "../Hooks/useGame";
import Appbar from "./appbar";
import webSocket from "socket.io-client";
import { useState } from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  Rating,
  ListItemText,
} from "@mui/material";
const WEBSOCKET_URL = "http://localhost:5000";

function Game(props) {
  const {
    connectWebSocket,
    joinRoom,
    queryGame,
    startGame,
    virus1,
    virus2,
    virus3,
    virus4,
    ws,
  } = useGame();

  useEffect(() => {
    if (!ws) {
      console.log(ws);
      connectWebSocket();
      console.log("hihi");
    }
  }, []);
  useEffect(() => {
    if (ws) {
      startGame({
        gameId: "123",
        playersId: ["1", "2", "3", "4"],
        playerNum: 4,
        level: "normal",
      });
      console.log("www");
    }
  }, [ws]);
  return (
    <div>
      <Appbar navigate={props.navigate} />
      <button onClick={() => props.navigate("/")}>back to homepage</button>
      <button onClick={() => joinRoom("1")}>click me to add room</button>
      <button
        onClick={() =>
          startGame({
            gameId: "123",
            playersId: ["1", "2", "3", "4"],
            playerNum: 4,
            level: "normal",
          })
        }
      >
        get game data
      </button>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        {[...Array(48).keys()].map((x) => {
          return (
            <ListItemButton>
              <ListItemText primary={x} />
              <Rating
                color="red"
                value={virus1[x] + virus2[x] + virus3[x] + virus4[x]}
                readOnly
              />
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
}
export default Game;
