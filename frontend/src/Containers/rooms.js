import react, { useEffect, useState } from "react";
import Appbar from "./appbar";
import instance from "../instance";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import useGame from "../Hooks/useGame";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Paper,
  Box,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Rooms(props) {
  const [rooms, setRooms] = useState([
    { name: "123", player: 4, capacity: 4, difficulty: "easy" },
    { name: "456", player: 3, capacity: 4, difficulty: "easy" },
    { name: "999", player: 1, capacity: 4, difficulty: "easy" },
  ]);
  const { connectWebSocket, joinRoom, ws } = useGame();
  const userId = useSelector((state) => state.session.userId);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await instance.get("/rooms");
      setRooms(data);
    };
    fetch();
  }, []);
  return (
    <>
      <Appbar navigate={props.navigate} />
      {/* <Box
        sx={{
          width: 300,
          height: 400,
          border: "1px dashed grey",
          mx: 0,
          padding: 0,
        }}
      >
        hello
      </Box>
      <Box sx={{ width: 300, height: 400 }}>hello2</Box> */}
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid item xs={3} mt={7} ml={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">難度</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Difficulty"
            >
              <MenuItem value={10}>Easy</MenuItem>
              <MenuItem value={20}>Normal</MenuItem>
              <MenuItem value={30}>Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid ml={2} mt={5} xs={8} sx={{ height: "100%" }}>
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
                        onClick={async () => {
                          const data = await instance.post("/joinRoom", {
                            userId,
                            roomId: room.name,
                          });
                          if (data === "success") {
                            props.navigate(`./room/${data}`);
                          } else {
                          }
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
        </Grid>
      </Grid>
    </>
  );
}
