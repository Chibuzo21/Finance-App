import { z } from "zod";

export const FormSchema = z
  .object({
    username: z.string().min(3, "Username must be atleast 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be atleast 6 characters"),
    confirmPassword: z.string().min(5, "Password must be atleast 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
