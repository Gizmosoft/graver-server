// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Google user ID (sub)
  email: { type: String, required: true },
  name: { type: String, required: true },
  picture: { type: String }, // Optional: URL of the user's profile picture
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

export default User;
