// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// -----------------------------
// CORS CONFIG
// -----------------------------
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "http://localhost:3000", // CRA dev (optional)
  "https://task-manager-frontend-amber-kappa.vercel.app", // Vercel frontend
  "https://task-manager-backend-qy4i.onrender.com", // Render backend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow tools like Postman / server-to-server (no Origin header)
      if (!origin) return callback(null, true);

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

// -----------------------------
// BODY PARSER
// -----------------------------
app.use(express.json());

// -----------------------------
// ROUTES
// -----------------------------
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// -----------------------------
// ERROR HANDLER (incl. CORS errors)
// -----------------------------
app.use((err, req, res, next) => {
  // CORS error
  if (err instanceof Error && err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS error: origin not allowed" });
  }

  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// -----------------------------
// 404 FALLBACK (no '*' route)
// -----------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -----------------------------
// START SERVER
// -----------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
