import z from "zod";
import { toneEnumValues } from "./model";
import { leadCreateSchema } from "../leads/schema";
import { projectCreateSchema } from "../projects/schema";

export const emailGenerateSchema = z.object({
  project: projectCreateSchema,
  lead: leadCreateSchema.omit({ "projectId": true }),
  tone: z.enum(toneEnumValues),
});

export type EmailGenerateInput = z.infer<typeof emailGenerateSchema>;
