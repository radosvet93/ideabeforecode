import { eq } from "drizzle-orm";
import { db } from "../../db/setup";
import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { leadsTable } from "../leads/model";
import type z from "zod";

export const projectsTable = pgTable("projects", {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow()
});

export const projectsSelectSchema = createSelectSchema(projectsTable)
export const projectInsertSchema = createInsertSchema(projectsTable)

export type ProjectInsertInput = z.infer<typeof projectInsertSchema>;

export const listProjects = () => db.select().from(projectsTable)
export const projectWithLeads = (id: string) =>
  db.select({
    project: {
      id: projectsTable.id,
      name: projectsTable.name,
      description: projectsTable.description,
      createdAt: projectsTable.createdAt
    },
    lead: {
      id: leadsTable.id,
      name: leadsTable.name,
      email: leadsTable.email,
      company: leadsTable.company,
      jobTitle: leadsTable.jobTitle,
      notes: leadsTable.notes,
      status: leadsTable.status,
      projectId: leadsTable.projectId,
      createdAt: leadsTable.createdAt,
    }
  })
    .from(projectsTable)
    .leftJoin(leadsTable, eq(leadsTable.projectId, projectsTable.id))
    .where(eq(projectsTable.id, id));

export const createProject = (project: ProjectInsertInput) => db.insert(projectsTable).values(project).returning();
