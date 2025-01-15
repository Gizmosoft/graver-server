import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import routerRegistry from "./routes/index.js";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = 5000;
// Convert ALLOWED_ORIGINS from .env to an array
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins list or if origin is undefined (non-browser requests like Postman)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    // origin: "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// Serve uploaded images statically
console.log("Setting static directory to /public");
// Serve the 'public' directory as a static folder
app.use("/public", express.static("public")); // This exposes the 'public' folder at '/public'

// Connect to MongoDB and ensure database/collection existence
const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB database connected");
  } catch (error) {
    console.error("Error initializing MongoDB database:", error);
    process.exit(1); // Exit the process with an error code if initialization fails
  }
};

console.log("Registering routes on the server...");
routerRegistry(app);

// Start the server only after the database is initialized
initializeDatabase().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
