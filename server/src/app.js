import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
