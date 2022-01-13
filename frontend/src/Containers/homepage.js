import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Login, Logout } from "../features/session/sessionSlices";
import instance from "../instance";
import ResponsiveAppBar from "./appbar";
import { Snackbar, Alert } from "@mui/material";
const theme = createTheme({
  palette: {
    quickStart: {
      main: "#ffc107",
      contrastText: "#fff",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  padding: "5vh",
}));

function HomePage(props) {
  const [open, setOpen] = useState(false);
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
      <Item elevation={3}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="quickStart"
            style={{ width: "20vw", height: "10vh", fontSize: "2.4vw" }}
            onClick={async () => {
              if (!login) {
                props.navigate("./login");
              }
              try {
                await instance.post("/createRoom", {
                  userId: userId,
                  difficulty: "normal",
                });
              } catch (e) {
                setOpen(true);
              }
            }}
          >
            QuickStart
          </Button>
        </ThemeProvider>
      </Item>

      {/* <button
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
      <button onClick={() => props.navigate("/game")}>go to game</button> */}
      <Snackbar
        anchorOrigin={{ vertical: "button", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Already in game
        </Alert>
      </Snackbar>
    </div>
  );
}
export default HomePage;
