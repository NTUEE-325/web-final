import mongoose from "mongoose";
const Schema = mongoose.Schema;
const GameSchema = new Schema({
  id: String,
  players: [
    {
      playerId: String,
      pos: Number,
      playerHand: [Number],
      playerJob: Number,
    },
  ],
  who: Number,
  leftMove: Number,
  difficulty: String,
  playerDeck: [Number],
  discardPlayerDeck: [Number],
  virusDeck: [Number],
  discardVirusDeck: [Number],
  activeVirus: [Number],
  // virus1: [Number],
  // virus2: [Number],
  // virus3: [Number],
  // virus4: [Number],
  virus: [Number],
  life: Number,
  speed: Number,
  lab: [Number],
});
const Game = mongoose.model("Game", GameSchema);
export default Game;
