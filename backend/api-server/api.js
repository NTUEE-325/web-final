import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ a: 1, b: 2 });
});
router.get("/session", (req, res) => {
  //console.log(req.session.id);
  if (req.session.userId) {
    res.status(200).send({ id: req.session.userId });
  } else {
    res.status(403).send();
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
export default router;
