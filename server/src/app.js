import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorhandler.js";
import auth from "./routes/auth.route.js";
import expense from "./routes/expense.route.js";
import income from "./routes/income.route.js";

dotenv.config();

const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://final-year-project-vault.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connectDB();

// routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", auth);
app.use("/api/expense", expense);
app.use("/api/income", income);

// error handler  middleware
app.use(errorMiddleware);

export default app;
