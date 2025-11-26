// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// -------------------------------
// ✅ CORS FIX FOR LOCAL + VERCEL + RENDER
// -------------------------------
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "http://localhost:3000", // CRA dev (optional)
  "https://task-manager-frontend-amber-kappa.vercel.app", // Your Vercel frontend
  "https://task-manager-backend-qy4i.onrender.com", // Backend's own domain
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / server-to-server

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Allow OPTIONS for all routes
app.options("*", cors());

// -------------------------------
// Body Parser
// -------------------------------
app.use(express.json());

// -------------------------------
// Routes
// -------------------------------
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// -------------------------------
// Server Start
// -------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
