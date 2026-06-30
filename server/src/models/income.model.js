import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true },
);

incomeSchema.pre("save", function (next) {
  const d = new Date(this.date);
  this.month = d.getMonth() + 1;
  this.year = d.getFullYear();
  next();
});

export default mongoose.model("Income", incomeSchema);
