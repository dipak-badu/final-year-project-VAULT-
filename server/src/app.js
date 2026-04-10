import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorhandler.js";
import auth from "./routes/auth.route.js";

dotenv.config();

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
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
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/income", incomeRoutes);

// error handler  middleware
app.use(errorMiddleware);

export default app;
