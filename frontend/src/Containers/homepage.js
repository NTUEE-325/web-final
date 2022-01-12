import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Login, Logout } from "../features/session/sessionSlices";
import instance from "../instance";
import ResponsiveAppBar from "./appbar";
function HomePage(props) {
  const login = useSelector((state) => state.session.login);
  const userId = useSelector((state) => state.session.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await instance.get("/session");
      console.log(data);
      if (data) {
        dispatch(Login({ userId: data.userId }));
      }
    };

    fetch();
  }, []);
  return (
    <div>
      <ResponsiveAppBar navigate={props.navigate} />
      <button
        onClick={async () => {
          await instance.post("/createRoom", {
            userId: userId,
            difficulty: "normal",
          });
        }}
      >
        QuickStart
      </button>
      <button
        onClick={async () => {
          const data = await instance.get("/session");
          console.log(data);
        }}
      >
        get session
      </button>
      <button
        onClick={() => {
          instance.post("/login", { userId: "1", password: "1" });
        }}
      >
        send session
      </button>
      <button
        onClick={() => {
          instance.delete("/login");
        }}
      >
        delete session
      </button>
      {login ? <div>{userId}</div> : <div>Not login yet</div>}
      <button onClick={() => props.navigate("/login")}>go to login page</button>
      <button onClick={() => props.navigate("/game")}>go to game</button>
    </div>
  );
}
export default HomePage;
