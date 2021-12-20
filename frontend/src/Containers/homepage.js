import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Login, Logout } from "../features/session/sessionSlices";
import instance from "../instance";
function HomePage(props) {
  const login = useSelector((state) => state.session.login);
  const id = useSelector((state) => state.session.id);
  const dispatch = useDispatch();
  console.log(document.cookie);
  useEffect(() => {
    const fetch = async () => {
      const data = await instance.get("/session");
      if (data) {
        dispatch(Login({ id: "logined" }));
      }
    };
    fetch();
  }, []);
  return (
    <div>
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
      {login ? <div>{id}</div> : <div>Not login yet</div>}
      <button onClick={() => props.navigate("/login")}>go to login page</button>
      <button onClick={() => props.navigate("/game")}>go to game</button>
    </div>
  );
}
export default HomePage;
