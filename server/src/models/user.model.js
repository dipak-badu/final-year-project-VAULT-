import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    income: {
      type: Number,
      default: 0,
    },
    monthlyIncome: {
      type: Number,
      default: 0,
    },
    avgMonthlyIncome: {
      type: Number,
      default: 0,
    },
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },

  { timestamps: true },
);

export default mongoose.model("User", userSchema);
