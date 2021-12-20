import HomePage from "./homepage";
import LoginPage from "./loginpage";
import Game from "./game";
import { Routes, Route, useNavigate } from "react-router-dom";
function Guide(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage navigate={navigate} />} />
        <Route path="/login" element={<LoginPage navigate={navigate} />} />
        <Route path="/game" element={<Game navigate={navigate} />} />
      </Routes>
    </div>
  );
}
export default Guide;
