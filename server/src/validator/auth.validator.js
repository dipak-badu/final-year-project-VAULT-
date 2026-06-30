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
