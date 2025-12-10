import type { Request, Response } from 'express';
import { createProject, listProjects, projectsSelectSchema, projectWithLeads } from "./model";
import { leadsSelectSchema } from '../leads/model';
import { countEmailsByProject } from '../emails/model';
import { ZodError } from 'zod';
import { formatZodErrors } from 'src/utils/validators';
import { projectCreateSchema } from './schema';

export const getProjectsHandler = async (_req: Request, res: Response) => {
  const projectDB = await listProjects();

  const projectDto = projectDB.map(row => projectsSelectSchema.parse(row));

  res.json(projectDto);
}

export const getProjectByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;

    const rows = await projectWithLeads(id);

    if (!rows.length) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Project fields are duplicated in every row → take from first row
    const project = projectsSelectSchema.parse(rows[0].project);

    // Leads: filter out null lead rows
    const leads = rows
      .filter(row => row.lead !== null)
      .map(row => leadsSelectSchema.parse(row.lead));

    // Get the email count per project
    const [{ count: emailCount }] = await countEmailsByProject(id);

    return res.json({
      ...project,
      leads,
      emailCount
    });

  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const createProjectHandler = async (req: Request, res: Response) => {
  try {
    const parsed = projectCreateSchema.parse(req.body);

    const [created] = await createProject(parsed);
    const createdDto = projectsSelectSchema.parse(created);

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