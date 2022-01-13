import { useEffect, useState } from "react";
import webSocket from "socket.io-client";
const WEBSOCKET_URL = "http://localhost:5000";

const useGame = () => {
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
  const [who, setWho] = useState("");
  const [leftMove, setLeftMove] = useState(4);
  const [job, setJob] = useState(0);
  return {
    setPlayerDeck,
    setDiscardPlayerDeck,
    setVirusDeck,
    setDiscardVirusDeck,
    setActiveVirus,
    setVirus1,
    setVirus2,
    setVirus3,
    setVirus4,
    who,
    leftMove,
    job,
    setJob,
    setLeftMove,
    setWho,
    virus1,
    virus2,
    virus3,
    virus4,
  };
};
export default useGame;
