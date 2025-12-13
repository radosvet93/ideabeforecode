import { eq, sql } from "drizzle-orm";
import { db } from "../../db/setup";
import { pgTable, text, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { leadsTable } from "../leads/model";

export const toneEnumValues = ["professional", "friendly", "casual", "urgent"] as const;

export type Tone = typeof toneEnumValues[number];

export const toneEnum = pgEnum("status", toneEnumValues);

export const emailsTable = pgTable("emails", {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  tone: toneEnum('tone').default('professional'),
  leadId: uuid('lead_id')
    .notNull()
    .references(() => leadsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp('created_at').defaultNow()
});

export const emailsSelectSchema = createSelectSchema(emailsTable)

export const emailById = (id: string) => db.select().from(emailsTable).where(eq(emailsTable.id, id));
export const listEmails = () => db.select().from(emailsTable)
export const countEmailsByProject = (projectId: string) =>
  db
    .select({ count: sql<number>`COUNT(*)` })
    .from(emailsTable)
    .innerJoin(leadsTable, eq(emailsTable.leadId, leadsTable.id))
    .where(eq(leadsTable.projectId, projectId));
