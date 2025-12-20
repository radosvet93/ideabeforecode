import z from "zod";
import { statusEnumValues } from "./model";

export const leadCreateSchema = z.object({
  email: z.union([
    z.literal(''),
    z.email(),
  ]),
  name: z.string().min(1, "Name is required"),
  phone: z.string(),
  company: z.string(),
  jobTitle: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(statusEnumValues).optional(),
  projectId: z.uuid()
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;

export const leadStatusUpdateSchema = z.object({
  status: z.enum(statusEnumValues, 'Invalid status provided.')
});