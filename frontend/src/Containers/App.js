import logo from "../logo.svg";
import "../App.css";
import webSocket from "socket.io-client";
import { BrowserRouter as Router } from "react-router-dom";
import Guide from "./guide";
function App() {
  return (
    <Router>
      <Guide />
    </Router>
  );
}

export default App;
