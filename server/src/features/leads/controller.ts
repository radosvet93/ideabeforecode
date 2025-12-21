import { ZodError } from "zod";
import { bulkCreateLeads, createLead, deleteLead, leadsSelectSchema, listLeads, updateLeadStatus } from "./model";
import { csvUploadSchema, leadCreateSchema, leadStatusUpdateSchema, type CsvLead, type ValidLeads } from "./schema";
import { formatZodErrors } from "src/utils/validators";
import type { Request, Response } from "express";
import { parse } from 'csv-parse/sync';

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

export const uploadLeadsHandler = async (req: Request, res: Response) => {
  try {

    if (!req.headers['content-type']?.includes('csv')) {
      return res.status(400).send('Invalid file type');
    }

    const projectId = req.query.projectId as string

    if (!projectId) {
      return res.status(400).send('Please use the projectId in the query strings');
    }

    const csvFile = req.body as Buffer;
    const csvText = csvFile.toString('utf-8');

    const csvContentRecords = parse<CsvLead>(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const validLeads: ValidLeads[] = [];
    const errors: { row: number, errors: string[] }[] = [];

    csvContentRecords.forEach((record, index) => {
      const result = csvUploadSchema.safeParse(record);

      if (!result.success) {
        errors.push({
          row: index + 1,
          errors: result.error.issues.map((i) => i.message),
        });
        return;
      }

      validLeads.push({
        ...result.data,
        projectId
      })
    });

    await bulkCreateLeads(validLeads);

    return res.status(201);

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: formatZodErrors(error)
      });
    }

    res.status(500).json({ error: "Failed to upload leads." });
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

export const deleteLeadHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;

    const [deleted] = await deleteLead(id);

    if (!deleted) {
      return res.status(404).json({ error: "Lead not found." });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete lead." });
  }
}