import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ScoreCardSchema = new Schema({});
const ScoreCard = mongoose.model("ScoreCard", ScoreCardSchema);
export default ScoreCard;
