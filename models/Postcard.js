// models/Postcard.js
import mongoose from "mongoose";

const postcardSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Store image as URL or file path
  text: { type: String, required: true }, // Text message on the postcard
  creator: { type: String, required: true }, // Reference to the User who created it
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

const Postcard = mongoose.model("Postcard", postcardSchema);

export default Postcard;
