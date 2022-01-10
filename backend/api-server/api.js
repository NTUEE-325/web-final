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
  const user = await User.findOne({
    $or: [{ userId: userId }, { email: userId }],
  });
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
    req.session.userId = user.userId;
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
  //res.redirect("http://localhost:3000/login");
});
router.get("/verify/:secretToken", async (req, res) => {
  const { secretToken } = req.params;
  console.log(secretToken);
  const appendingUser = await AppendingUser.findOne({
    secretToken: secretToken.trim(),
  });
  console.log(appendingUser);
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
router.post("/forgetpw", async (req, res) => {
  const { email } = req.body;
  //console.log(email);
  const user = await User.findOne({
    email,
  });
  if (!user) {
    res.status(403).send();
    console.log("User didn't signup before.");
    return;
  }

  //const email = user.email;
  const data = {
    email: user.email,
    userId: user.userId,
    password: user.password,
  };

  const checkUser = await AppendingUser.findOne({ email: email });
  if (checkUser) {
    res.status(406);
    res.json({ message: "forgetPassword mail already sended" });
    console.log("forgetPassword mail already sended");
    return;
  }

  await sendEmail(email, "forgotPassword", data);

  console.log("success");
  res.json({ message: "success" });
  //顯示去信箱確認信件
});
router.post("/resetpw/:secretToken", async (req, res) => {
  const newPassword = req.body;
  const { secretToken } = req.params;
  console.log(secretToken);

  const appendingUser = await AppendingUser.findOne({
    secretToken: secretToken.trim(),
  });
  if (!appendingUser) {
    res.status(403).send();
    return;
  }

  User.updateOne(
    { userId: appendingUser.userId },
    { $set: { password: newPassword } }
  );
  const newUser = await User.findOne({ userId: appendingUser.userId });
  if (!newUser) {
    res.status(403).send();
    return;
  }
  console.log(newUser.password);

  await AppendingUser.findOneAndDelete({
    secretToken: secretToken.trim(),
  });

  res.redirect("http://localhost:3000/login");
});

export default router;
