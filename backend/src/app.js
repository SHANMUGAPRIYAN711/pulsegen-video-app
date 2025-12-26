import dotenv from "dotenv"; 
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// 👉 ADD THIS
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
