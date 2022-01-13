import React, { useEffect } from "react";
import useGame from "../Hooks/useGame";
import Appbar from "./appbar";
import webSocket from "socket.io-client";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import instance from "../instance";
import { Login } from "../features/session/sessionSlices";
import {
  List,
  ListSubheader,
  ListItemButton,
  Rating,
  ListItemText,
} from "@mui/material";
import io from "socket.io-client";
const WEBSOCKET_URL = "http://localhost:5000";

function Game(props) {
  const wsRef = useRef(null);
  const roomId = useSelector((state) => state.session.roomId);
  const dispatch = useDispatch();
  const {
    who,
    job,
    leftMove,
    virus1,
    virus2,
    virus3,
    virus4,
    setWho,
    setJob,
    setLeftMove,
    setPlayerDeck,
    setDiscardPlayerDeck,
    setVirusDeck,
    setDiscardVirusDeck,
    setVirus1,
    setVirus2,
    setVirus3,
    setVirus4,
  } = useGame();
  useEffect(() => {
    let user;
    const fetch = async () => {
      user = await instance.get("/session");
      if (user.data) {
        dispatch(Login({ userId: user.data.userId, roomId: user.data.gameId }));
      }
    };
    fetch().then(() => {
      wsRef.current = io(WEBSOCKET_URL);
      // wsRef.current.on("room", (data) => {
      //   console.log(data.players);
      //   setPlayers([...data.players]);
      // });
      wsRef.current.on("gameDetail", (data) => {
        console.log(data);
        setWho(data.players[data.who].playerId);
        setPlayerDeck(data.playerDeck);
        setDiscardPlayerDeck(data.discardplayerDeck);
        setVirusDeck(data.virusDeck);
        setDiscardVirusDeck(data.discardvirusDeck);
        setVirus1(data.virus1);
        setVirus2(data.virus2);
        setVirus3(data.virus3);
        setVirus4(data.virus4);
      });
      wsRef.current.on("drawPlayerDeck", (data) => {
        setPlayerDeck(data.playerDeck);
        setDiscardPlayerDeck(data.discardplayerDeck);
      });
      wsRef.current.on("drawvirusDeck", (data) => {
        setVirusDeck(data.virusDeck);
        setDiscardVirusDeck(data.discardvirusDeck);
      });
      wsRef.current.on("setVirus", (data) => {
        setVirus1(data.virus1);
        setVirus2(data.virus2);
        setVirus3(data.virus3);
        setVirus4(data.virus4);
      });
      wsRef.current.on("setWho", (data) => {
        setWho(data.who);
      });
      wsRef.current.on("setLeftMove", (data) => {
        setLeftMove(data.leftMove);
      });
      wsRef.current.emit("queryGame", user.data.gameId);
    });

    //dispatch(Addevent({ event: "room" }));

    return () => wsRef.current.disconnect();
  }, []);
  return (
    <div>
      <Appbar navigate={props.navigate} />
      {/* <button onClick={() => props.navigate("/")}>back to homepage</button>
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
      </button> */}
      <p>leftMove:{leftMove}</p>
      <p>who:{who}</p>
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
