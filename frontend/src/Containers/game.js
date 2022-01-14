import React, { useEffect } from "react";
import useGame from "../Hooks/useGame";
import Appbar from "./appbar";
import webSocket from "socket.io-client";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import instance from "../instance";
import { Login } from "../features/session/sessionSlices";
import MoveSelector from "../Components/moveSelector";
import {
  List,
  ListSubheader,
  ListItemButton,
  Rating,
  ListItemText,
  Grid,
  Card,
  Button,
  Typography,
} from "@mui/material";
import io from "socket.io-client";
import GameBoard from "../Components/gameBoard";

const WEBSOCKET_URL = "http://localhost:5000";

function Game(props) {
  const wsRef = useRef(null);
  const roomId = useSelector((state) => state.session.roomId);
  const dispatch = useDispatch();
  const {
    who,
    job,
    leftMove,
    virus,
    players,
    setPlayers,
    setWho,
    setJob,
    setLeftMove,
    setPlayerDeck,
    setDiscardPlayerDeck,
    setVirusDeck,
    setDiscardVirusDeck,
    setVirus,
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
        setPlayers(data.players);
        setVirus(data.virus);
        setWho(data.players[data.who].playerId);
        setPlayerDeck(data.playerDeck);
        setDiscardPlayerDeck(data.discardplayerDeck);
        setVirusDeck(data.virusDeck);
        setDiscardVirusDeck(data.discardvirusDeck);
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
        setVirus(data.virus);
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
      <Grid container>
        <Grid item xs={8.5}>
          <GameBoard
            players={players}
            virus={virus}
            who={who}
            leftMove={leftMove}
          ></GameBoard>
        </Grid>
        <Grid item xs={3.5}>
          <Grid container>
            <Grid item xs={6.5}>
              <MoveSelector></MoveSelector>
              {/* 456 */}
              {/* <Grid innerContainer>
            <Grid item xs={8}>
              <MoveSelector></MoveSelector>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Player 1
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: Medic
                </Typography>
              </Card>
            </Grid> */}
              {/* </Grid> */}
            </Grid>
            <Grid item xs={4.5} mt={"20px"} mr={"10px"}>
              <Card>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 26 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Player 1
                </Typography>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: Medic
                </Typography>
                <Button ml={"10px"}>ShowCard</Button>
              </Card>
              <br />
              <Card>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 26 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Player 2
                </Typography>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: Scientist
                </Typography>
                <Button ml={"10px"}>ShowCard</Button>
              </Card>
              <br />
              <Card>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 26 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Player 3
                </Typography>
                <Typography
                  ml={"10px"}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Job: Builder
                </Typography>
                <Button ml={"10px"}>ShowCard</Button>
              </Card>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={11}>
            <Card>
              <Typography
                ml={"10px"}
                sx={{ fontSize: 26 }}
                color="text.secondary"
                gutterBottom
              >
                Me
              </Typography>
              <Typography
                ml={"10px"}
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                Job: Builder
              </Typography>
            </Card>
          </Grid>
          {/* <Card>
            <Typography
              ml={"10px"}
              sx={{ fontSize: 26 }}
              color="text.secondary"
              gutterBottom
            >
              Me
            </Typography>
            <Typography
              ml={"10px"}
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Job: Builder
            </Typography>
          </Card> */}
        </Grid>
      </Grid>

      {/* <List
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
      </List> */}
    </div>
  );
}
export default Game;
