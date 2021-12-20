import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

dotenv.config();
console.log(process.env.MONGO_URL);

const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const datas = [
  {
    userId: "1",
    password: "1",
    status: "offline",
    gameId: "0",
  },
  {
    userId: "2",
    password: "2",
    status: "offline",
    gameId: "0",
  },
  {
    userId: "3",
    password: "3",
    status: "offline",
    gameId: "0",
  },
  {
    userId: "4",
    password: "4",
    status: "offline",
    gameId: "0",
  },
];
// datas.forEach(async (data) => {
//   data.password = await bcrypt.hash(data.password, 10);
//   console.log(data.password);
// });

db.once("open", async () => {
  console.log("db connected");
  await User.deleteMany({});
  datas.forEach(async (data) => {
    data.password = await bcrypt.hash(data.password, 10);
    const user = new User(data);
    user.save();
  });
  console.log("finish saving data");
});
