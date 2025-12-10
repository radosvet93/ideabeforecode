import { ZodError } from "zod";
import { createLead, leadsSelectSchema, listLeads, updateLeadStatus } from "./model";
import { leadCreateSchema, leadStatusUpdateSchema } from "./schema";
import { formatZodErrors } from "src/utils/validators";
import type { Request, Response } from "express";

export const createLeadHandler = async (req: Request, res: Response) => {
  try {
    const parsed = leadCreateSchema.parse(req.body);

    const [created] = await createLead(parsed);
    const createdDto = leadsSelectSchema.parse(created);

    res.status(201).json(createdDto);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: formatZodErrors(error)
      });
    }

    res.status(500).json({ error: "Failed to create lead." });
  }
}

export const getLeadsHandler = async ({ res }: { res: Response }) => {
  try {
    const leadDB = await listLeads();

    const leadDto = leadDB.map(row => leadsSelectSchema.parse(row));

    res.json(leadDto);

  } catch (error) {
    res.status(500).json({ error: "Failed to get leads." });
  }
}

export const patchLeadStatusHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const parsed = leadStatusUpdateSchema.parse(req.body);

    const [updated] = await updateLeadStatus(id, parsed.status);

    if (!updated) {
      return res.status(404).json({ error: "Lead not found." });
    }

    const updatedDto = leadsSelectSchema.parse(updated);
    res.json(updatedDto);

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: formatZodErrors(error)
      });
    }

    res.status(500).json({ error: "Failed to update lead status." });
  }
}