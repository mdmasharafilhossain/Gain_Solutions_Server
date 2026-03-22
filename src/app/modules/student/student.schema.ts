import { z } from "zod"

const uuid = z.uuid("Invalid UUID format")
export const createStudentSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long"),

    instituteId: uuid,
  }),
})

export const updateStudentSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    instituteId: uuid.optional(),
  }),
})
export const studentQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
})
export type CreateStudentInput = z.infer<typeof createStudentSchema>["body"];
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>["body"];