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
  const [virus, setVirus] = useState(Array(48).fill(0));
  const [players, setPlayers] = useState([]);
  const [who, setWho] = useState(0);
  const [leftMove, setLeftMove] = useState(4);
  const [job, setJob] = useState(0);
  return {
    players,
    setPlayers,
    setPlayerDeck,
    setDiscardPlayerDeck,
    setVirusDeck,
    setDiscardVirusDeck,
    setActiveVirus,
    setVirus,
    who,
    leftMove,
    job,
    setJob,
    setLeftMove,
    setWho,
    virus,
  };
};
export default useGame;
