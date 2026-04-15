import express from "express";
import ExpressError from "../utils/ExpressError.js";
import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { expenseSchema } from "../validator/expense.validate.js";
import Expense from "../models/expenses.model.js";

const router = express.Router();

// add expense

router.post(
  "/addExpense",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const parseData = expenseSchema.safeParse(req.body);
    if (!parseData.success) {
      const errors = parseData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ExpressError(errors, 400);
    }

    const { name, amount, category, description, date } = parseData.data;

    const expense = new Expense({
      user: req.user._id,
      name,
      amount,
      category,
      description,
      date,
    });

    await expense.save();

    res.status(201).json({
      message: "expenses is saved successfully!!",
      expense,
    });
  }),
);

export default router;
