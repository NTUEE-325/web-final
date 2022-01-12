import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlices";
import gameReducer from "../features/game/socketSlices";
export default configureStore({
  reducer: {
    session: sessionReducer,
    game: gameReducer,
  },
});
