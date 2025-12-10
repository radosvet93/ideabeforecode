import z from "zod";

export const projectCreateSchema = z.object({
  name: z
    .string()
    .min(5, "Project name must be at least 5 characters.")
    .max(32, "Project name must be at most 32 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;