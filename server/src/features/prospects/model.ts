import { db } from "../../db/setup";
import { pgTable, text, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum("status", ["new", "contacted", "interested", "declined"]);

export const prospectsTable = pgTable("prospects", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  name: text(),
  company: text(),
  jobTitle: text(),
  status: statusEnum().default('new'),
  notes: text(),
  createdAt: timestamp().defaultNow()
});

export const listProspects = () => db.select().from(prospectsTable)
