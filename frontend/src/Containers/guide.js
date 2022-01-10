import HomePage from "./homepage";
import LoginPage from "./loginpage";
import Game from "./game";
import SignUpPage from "./signup";
import ForgetPw from "./forgetpw";
import ResetPw from "./resetpw";
import { Routes, Route, useNavigate } from "react-router-dom";
function Guide(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage navigate={navigate} />} />
        <Route path="/login" element={<LoginPage navigate={navigate} />} />
        <Route path="/signup" element={<SignUpPage navigate={navigate} />} />
        <Route path="/game" element={<Game navigate={navigate} />} />
        <Route path="/forgetpw" element={<ForgetPw navigate={navigate} />} />
        <Route path="/resetpw" element={<ResetPw navigate={navigate} />} />
      </Routes>
    </div>
  );
}
export default Guide;
