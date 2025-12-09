import { db } from "../../db/setup";
import { pgTable, text, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { projectsTable } from "../projects/model";
import { eq } from "drizzle-orm";

export const statusEnumValues = ["new", "contacted", "interested", "closed", "declined"] as const;

export type Status = typeof statusEnumValues[number];

export const statusEnum = pgEnum("status", statusEnumValues);

export const leadsTable = pgTable("leads", {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  company: text('company'),
  jobTitle: text('job_title'),
  status: statusEnum('status').default('new'),
  notes: text('notes'),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp('created_at').defaultNow()
});

export const leadsSelectSchema = createSelectSchema(leadsTable)
export const leadsUpdateSchema = createUpdateSchema(leadsTable)

export const listLeads = () => db.select().from(leadsTable)

export const listLeadsByProject = (projectId: string) => db.select()
  .from(leadsTable)
  .where(eq(leadsTable.projectId, projectId));

export const updateLeadStatus = (id: string, status: Status) => db.update(leadsTable).set({ status }).where(eq(leadsTable.id, id)).returning();