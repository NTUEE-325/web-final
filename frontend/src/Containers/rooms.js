import react, { useEffect, useState } from "react";
import Appbar from "./appbar";
import instance from "../instance";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Paper,
  Box,
} from "@mui/material";
export default function Rooms(props) {
  const [rooms, setRooms] = useState(["123", "456", "www"]);
  //   useEffect(() => {
  //     const fetch = async () => {
  //       const { data } = await instance.get("/rooms");
  //       setRooms(data);
  //     };
  //   });
  return (
    <>
      <Appbar navigate={props.navigate} />
      <Box
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
      <Box sx={{ width: 300, height: 400 }}>hello2</Box>
      <Stack mt={4} direction="row" spacing={2} sx={{ height: "100%" }}>
        {rooms.map((room) => (
          <Card sx={{ minWidth: 400 }}>
            <CardContent>{room}</CardContent>
            <CardActions>
              <Button>Join Room</Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
}
