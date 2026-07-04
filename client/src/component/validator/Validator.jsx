import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(4, "Name is Required"),
  email: z.string().nonempty("Email is required"),
  password: z.string().min(6, "password must be at least 6 charater"),
});

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().min(6, "password must be at least 6 charater"),
});

export const expenseSchema = z.object({
  name: z.string().min(1, "Expense name is required").trim(),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.enum([
    "food",
    "transport",
    "housing",
    "entertainment",
    "health",
    "shopping",
    "education",
    "utilities",
    "other",
  ]),
  description: z.string().min(1, "Description is required").trim(),
  date: z.coerce.date().optional(),
});

export const incomeSchema = z.object({
  amount: z.coerce.number().min(0, "Amount must be 0 or greater"),
  name: z.string(),
  source: z.string().min(1, "Source is required").trim(),
  description: z.string().trim().optional(),
  date: z.coerce.date().optional(),
});
