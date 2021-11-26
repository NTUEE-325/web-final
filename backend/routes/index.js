import express from "express";
const router = express.Router();

router.get("/game", async (req, res) => {
  res.status(200).send();
});
export default router;
