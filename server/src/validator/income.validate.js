import { z } from "zod";

export const incomeSchema = z.object({
  amount: z.coerce.number().min(0, "Amount must be 0 or greater"),
  name: z.string(),
  source: z.string().min(1, "Source is required").trim(),
  description: z.string().trim().optional(),
  date: z.coerce.date().optional(),
});
