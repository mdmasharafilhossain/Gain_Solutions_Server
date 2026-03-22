import { z } from "zod"

const uuid = z.string().uuid("Invalid UUID format")

export const createResultSchema = z.object({
  body: z.object({
    studentId: uuid,
    courseId: uuid,
    score: z
      .number()
      .min(0, { message: "Score cannot be negative" })
      .max(100, { message: "Score cannot exceed 100" }),
    year: z
      .number()
      .min(2000, { message: "Year must be valid" })
      .max(new Date().getFullYear(), {
        message: "Year cannot be in future",
      }),
  }),
});
export const updateResultSchema = z.object({
  body: z.object({
    studentId: uuid.optional(),
    courseId: uuid.optional(),
    score: z.number().min(0).max(100).optional(),
    year: z.number().optional(),
  }),
})

export const resultQuerySchema = z.object({
  query: z.object({
    year: z.string().optional(),
    studentId: z.string().optional(),
    courseId: z.string().optional(),
  }),
})

export type CreateResultInput = z.infer<typeof createResultSchema>["body"];
export type UpdateResultInput = z.infer<typeof updateResultSchema>["body"];