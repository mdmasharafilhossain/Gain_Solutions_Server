import { z } from "zod";

export const signupSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .toLowerCase()

            .regex(z.regexes.email, { message: "Invalid email format" })
            .max(100, { message: "Email is too long" }),
        password: z
            .string()
            .trim()

            .min(6, { message: "Password must be at least 6 characters" })
            .max(50, { message: "Password must be at most 50 characters" })
            .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Must include at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Must include at least one special character" })
            .refine((val) => !/\s/.test(val), {
                message: "Password must not contain spaces",
            }),

    }),
});

export const signinSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .toLowerCase()
            .regex(z.regexes.email, { message: "Invalid email format" })
            .max(100, { message: "Email is too long" }),
        password: z
            .string()
            .trim()
            .min(6, { message: "Password is required" })
            .max(50, { message: "Password is too long" }),
    }),
});
export type SignupInput = z.infer<typeof signupSchema>["body"];
export type SigninInput = z.infer<typeof signinSchema>["body"];