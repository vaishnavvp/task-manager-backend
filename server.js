const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ✅ CORS FIX
const allowedOrigins = [
  "http://localhost:5173",                       // Vite dev
  "https://task-manager-backend-qy4i.onrender.com", // (optional, backend own origin)
  "https://YOUR-FRONTEND-NAME.vercel.app",      // <-- when you deploy frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like Postman (no origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// (optional but nice)
app.options("*", cors());

// body parser
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
