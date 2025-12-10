import type { Response } from 'express';
import { emailsSelectSchema, listEmails } from "./model";

export const getEmailsHandler = async ({ res }: { res: Response }) => {
  const emailDB = await listEmails();

  const emailDto = emailDB.map(row => emailsSelectSchema.parse(row));

  res.json(emailDto);
}