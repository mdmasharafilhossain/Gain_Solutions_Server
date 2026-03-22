import { z } from "zod"
export const createCourseSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Course name must be at least 2 characters")
      .max(100),
  }),
})
export const updateCourseSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
  }),
})
export type CreateCourseInput = z.infer<typeof createCourseSchema>["body"];
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>["body"];