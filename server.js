import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import routerRegistry from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// const __dirname = path.resolve(); // Get the root directory path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
// Convert ALLOWED_ORIGINS from .env to an array
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin);
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

// Register API routes before serving static files
console.log("Registering routes on the server...");
routerRegistry(app); // Make sure this registers API routes like `/api/postcards`

// Serve the 'public' directory as a static folder
console.log("Setting static directory to /public/uploads");
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

// 🔹 Serve React frontend from `dist` folder (Assuming Vite build outputs to `dist`)
const frontendPath = path.join(__dirname, "dist");
app.use(express.static(frontendPath));

// Catch-all route for React frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

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

// Start the server only after the database is initialized
initializeDatabase().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on Render ${PORT}`)
  );
});
