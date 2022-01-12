import { useEffect, useState } from "react";
import webSocket from "socket.io-client";
const WEBSOCKET_URL = "http://localhost:5000";

const useGame = () => {
  const [ws, setWs] = useState(null);
  const [gameId, setGameId] = useState("");
  const [playerDeck, setPlayerDeck] = useState([]);
  const [discardplayerDeck, setDiscardPlayerDeck] = useState([]);
  const [virusDeck, setVirusDeck] = useState([]);
  const [discardvirusDeck, setDiscardVirusDeck] = useState([]);
  const [activeVirus, setActiveVirus] = useState([]);
  const [virus1, setVirus1] = useState(Array(48).fill(0));
  const [virus2, setVirus2] = useState(Array(48).fill(0));
  const [virus3, setVirus3] = useState(Array(48).fill(0));
  const [virus4, setVirus4] = useState(Array(48).fill(0));
  useEffect(() => {
    if (ws) {
      initWebSocket();
    }
  }, [ws]);
  const connectWebSocket = async () => {
    setWs(webSocket(WEBSOCKET_URL));
  };
  const initWebSocket = () => {
    ws.on("getMessage", (msg) => {
      console.log(msg);
    });
    ws.on("gameDetail", (data) => {
      console.log(data);
      setGameId(data.id);
      setPlayerDeck(data.playerDeck);
      setDiscardPlayerDeck(data.discardplayerDeck);
      setVirusDeck(data.virusDeck);
      setDiscardVirusDeck(data.discardvirusDeck);
      setVirus1(data.virus1);
      setVirus2(data.virus2);
      setVirus3(data.virus3);
      setVirus4(data.virus4);
    });
  };
  const joinRoom = ({ userId, roomId }) => {
    ws.emit("joinRoom", { userId, roomId });
  };
  const queryGame = (gameId) => {
    ws.emit("queryGame", gameId);
  };
  const startGame = (option) => {
    ws.emit("startGame", option);
  };
  return {
    connectWebSocket,
    joinRoom,
    queryGame,
    startGame,
    virus1,
    virus2,
    virus3,
    virus4,
    ws,
  };
};
export default useGame;
