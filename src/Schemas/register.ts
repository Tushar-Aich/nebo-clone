import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "username cannot be shorter than 3 characters")
    .max(20, "username cannot be longer than 20 characters")
    .toLowerCase()
    .trim()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "UserNames can only contain letters, numbers or underscores"
    ),
  password: z.string().min(8, "password cannot be shorter than 8 characters"),
  name: z.string().max(20, "OGName cannot be shorter than 20 characters"),
  email: z.email()
});