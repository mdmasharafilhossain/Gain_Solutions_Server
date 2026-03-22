import { z } from "zod"

export const InstituteSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100),

    location: z
      .string()
      .min(2, "Location is required")
      .max(100),
  }),
})
export type InstituteInput = z.infer<typeof InstituteSchema>["body"];
