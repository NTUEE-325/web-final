import express from "express";
import { User, AppendingUser } from "../models/user.js";
import sendEmail from "./sendmail.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ a: 1, b: 2 });
});
router.get("/session", (req, res) => {
  //console.log(req.session.id);
  if (req.session.userId) {
    res.status(200).send({ userId: req.session.userId });
  } else {
    res.status(200).send();
  }
});
router.post("/login", async (req, res) => {
  //compare login
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    res.status(403).send();
    console.log("User not found");
    return;
  }
  const check = await bcrypt.compare(password, user.password);
  if (!check) {
    res.status(403).send();
    console.log("Invalid password");
    return;
  }
  if (!req.session.userId) {
    req.session.userId = userId;
  }
  console.log("Successful login");

  res.status(200).send();
});
router.delete("/login", (req, res) => {
  req.session.destroy();
  console.log("Successful logout");
  res.status(200).send();
});
router.post("/signup", async (req, res) => {
  const { email, userId, password } = req.body;
  const data = {
    email: email,
    userId: userId,
    password: password,
  };
  const user = await User.findOne({ userId });
  if (user) {
    res.status(406);
    res.json({ message: "userId used" });
    console.log("userId used");
    return;
  }

  const user2 = await User.findOne({ email });
  if (user2) {
    res.status(406);
    res.json({ message: "email used" });
    console.log("email used");
    return;
  }

  const checkUser = await AppendingUser.findOne({ email });
  if (checkUser) {
    res.status(406);
    res.json({ message: "verification mail already sended" });
    console.log("verification mail already sended");
    return;
  }

  await sendEmail(email, "signUp", data);

  console.log("success");
  res.json({ message: "success" });
});
router.get("/verify/:secretToken", async (req, res) => {
  const { secretToken } = req.params;
  console.log(secretToken);
  const appendingUser = await AppendingUser.findOne({
    secretToken: secretToken.trim(),
  });
  if (!appendingUser) {
    res.status(403).send();
    return;
  }
  //appendingUser.active = true;
  //appendingUser.secretToken = "";
  //appendingUser.save();

  const data = {
    userId: appendingUser.userId,
    password: appendingUser.password,
    email: appendingUser.email,
    status: appendingUser.status,
    gameId: appendingUser.gameId,
  };

  const user = new User(data);
  user.save();

  await AppendingUser.findOneAndDelete({
    secretToken: secretToken.trim(),
  });

  //req.flash('success_msg','Thank you.You can now login');
  res.redirect("http://localhost:3000/login");
});
router.post("/forgetPassword/:userId", async (req, res) => {
  //取得新密碼還沒做
  const { userId } = req.params;
  console.log(userId);
  const user = await User.findOne({ userId: userId });
  if (!user) {
    res.status(403).send();
    return;
  }
  console.log(user.password);

  User.updateOne({ userId: userId }, { $set: { password: "" } });
  // ""裡面應該要塞新的密碼，且需要進行hash
  const newUser = await User.findOne({ userId: userId });
  if (!newUser) {
    res.status(403).send();
    return;
  }
  console.log(newUser.password);

  res.redirect("http://localhost:3000/login");
});

export default router;
