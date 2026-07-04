import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().min(1, "Expense name is required").trim(),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category  is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  date: z.coerce.date().optional(),
});
