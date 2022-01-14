import react from "react";
import Appbar from "./appbar";
import instance from "../instance";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Login, Joingame, Addevent } from "../features/session/sessionSlices";
import useGame from "../Hooks/useGame";
import { SocketContext } from "../socket";
import io from "socket.io-client";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Paper,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
  InputBase,
} from "@mui/material";
import { useSelector } from "react-redux";
export default function Friends(props) {
  return (
    <>
      <Appbar navigate={props.navigate} />
      <Grid container spacing={2} sx={{ height: "80vh" }}>
        <Grid item xs={3} mt={7} ml={3}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search ID for Friends"
              inputProps={{ "aria-label": "search for friends" }}
            />
          </Paper>
        </Grid>
        {/* <Grid ml={2} mt={5} xs={8} sx={{ height: "100%" }}>
          <Stack mt={4} spacing={2} sx={{ height: "100%" }}>
            {rooms.map((room) => (
              <Card
                sx={{ minWidth: 600, height: "10%", alignContent: "cneter" }}
              >
                <CardContent sx={{ alignItems: "center" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Item>{room.name}</Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        {"Players："}
                        {`${room.player} / ${room.capacity}`}
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        {"Difficulty："}
                        {room.difficulty}
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        sx={{ float: "right" }}
                        onClick={() => {
                          wsRef.current.emit("joinRoom", {
                            userId,
                            roomId: room.name,
                          });
                        }}
                      >
                        Join Room
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid> */}
      </Grid>
    </>
  );
}
