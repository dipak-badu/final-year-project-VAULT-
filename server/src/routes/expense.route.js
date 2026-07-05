import express from "express";
import ExpressError from "../utils/expressError.js";
import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { expenseSchema } from "../validator/expense.validate.js";
import Expense from "../models/expenses.model.js";

const router = express.Router();

// add expense

// get all expenses
router.get(
  "/getExpenses",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      sortBy = "date",
      sortOrder = "desc",
      startDate,
      endDate,
    } = req.query;

    const query = { user: req.user._id };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const limitNumber = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNumber - 1) * limitNumber;

    const allowedSortFields = [
      "date",
      "amount",
      "createdAt",
      "name",
      "category",
    ];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "date";
    const order = sortOrder === "asc" ? 1 : -1;

    const [expenses, totalExpenses] = await Promise.all([
      Expense.find(query)
        .sort({ [sortField]: order, createdAt: order })
        .skip(skip)
        .limit(limitNumber),
      Expense.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalExpenses / limitNumber);

    res.status(200).json({
      message: "expenses fetched successfully!!",
      expenses,
      pagination: {
        totalExpenses,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  }),
);

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

// edit expense
router.put(
  "/editExpense/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const parseData = expenseSchema.safeParse(req.body);
    if (!parseData.success) {
      const errors = parseData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ExpressError(errors, 400);
    }

    const { id } = req.params;
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user._id },
      parseData.data,
      { new: true, runValidators: true },
    );

    if (!expense) {
      throw new ExpressError("Expense not found", 404);
    }

    res.status(200).json({
      message: "expense updated successfully!!",
      expense,
    });
  }),
);

// delete expense
router.delete(
  "/deleteExpense/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!expense) {
      throw new ExpressError("Expense not found", 404);
    }

    res.status(200).json({
      message: "expense deleted successfully!!",
      expense,
    });
  }),
);

export default router;
