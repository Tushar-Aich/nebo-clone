import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "password cannot be shorter than 8 characters")
});