import express from "express";
import ExpressError from "../utils/ExpressError.js";
import asyncHandler from "../utils/asyncHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { incomeSchema } from "./../validator/income.validate";
pull;
import Income from "./../models/income.model.js";

const router = express.Router();

// POST /api/income/addIncome
router.post("/addIncome", authMiddleware, async (req, res) => {
  try {
    const parsed = incomeSchema.parse({
      ...req.body,
      amount: Number(req.body.amount),
    });

    const income = await Income.create({
      user: req.user.id, // from auth middleware
      amount: parsed.amount,
      source: parsed.source,
      description: parsed.description || "",
      date: parsed.date ? new Date(parsed.date) : new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    if (error?.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || "Validation failed",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to add income",
      error: error.message,
    });
  }
});

// GET /api/income/getIncomes
router.get("/getIncomes", authMiddleware, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();
    const sortBy = req.query.sortBy || "date";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const filter = { user: req.user.id };

    if (search) {
      filter.$or = [
        { source: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) {
        const e = new Date(endDate);
        e.setHours(23, 59, 59, 999);
        filter.date.$lte = e;
      }
    }

    const [incomes, totalIncomes, totalIncomeAmount] = await Promise.all([
      Income.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Income.countDocuments(filter),
      Income.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalIncomes / limit));

    return res.status(200).json({
      success: true,
      incomes,
      pagination: {
        totalIncomes,
        totalPages,
        currentPage: page,
        limit,
      },
      totalIncome: totalIncomeAmount?.[0]?.total || 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch incomes",
      error: error.message,
    });
  }
});

// PUT /api/income/editIncome/:id
router.put("/editIncome/:id", authMiddleware, async (req, res) => {
  try {
    const parsed = incomeSchema.parse({
      ...req.body,
      amount: Number(req.body.amount),
    });

    const updated = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        amount: parsed.amount,
        source: parsed.source,
        description: parsed.description || "",
        date: parsed.date ? new Date(parsed.date) : new Date(),
      },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income updated successfully",
      income: updated,
    });
  } catch (error) {
    if (error?.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || "Validation failed",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update income",
      error: error.message,
    });
  }
});

// DELETE /api/income/deleteIncome/:id
router.delete("/deleteIncome/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete income",
      error: error.message,
    });
  }
});

export default router;
