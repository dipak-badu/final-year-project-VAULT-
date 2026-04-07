import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "food",
        "transport",
        "housing",
        "entertainment",
        "health",
        "shopping",
        "education",
        "utilities",
        "other",
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: { type: Date, default: Date.now },
    month: { type: Number },
    year: { type: Number },
  },
  { timestamps: true },
);

expenseSchema.pre("save", function (next) {
  const d = new Date(this.date);
  this.month = d.getMonth() + 1;
  this.year = d.getFullYear();
  next();
});

export default mongoose.model("Expense", expenseSchema);
