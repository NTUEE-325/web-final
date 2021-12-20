import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userId: String,
  password: String,
  email: String,
  status: String,
  gameId: String,
});
const User = mongoose.model("User", UserSchema);
export default User;
