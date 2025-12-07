import { eq } from "drizzle-orm";
import { db } from "../../db/setup";
import { pgTable, text, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { leadsTable } from "../leads/model";

export const toneEnum = pgEnum("tone", ["professional", "friendly", "casual", "urgent"]);

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
