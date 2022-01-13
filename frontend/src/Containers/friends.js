import react from "react";
import Appbar from "./appbar";
import GameBoard from "../Components/gameBoard";
export default function Friends(props) {
  return (
    <>
      <Appbar navigate={props.navigate} />
      <GameBoard></GameBoard>
    </>
  );
}
