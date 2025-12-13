import type { Request, Response } from 'express';
import { emailsSelectSchema, listEmails } from "./model";
import { emailGenerateSchema } from './schema';
import { ZodError } from 'zod';
import { formatZodErrors } from 'src/utils/validators';
import { generateEmail } from 'src/features/emails/service';

export const getEmailsHandler = async ({ res }: { res: Response }) => {
  const emailDB = await listEmails();

  const emailDto = emailDB.map(row => emailsSelectSchema.parse(row));

  res.json(emailDto);
}

export const generateEmailHandler = async (req: Request, res: Response) => {

  try {
    const { lead, project, tone } = emailGenerateSchema.parse(req.body);

    // TODO: Save it in DB??? -> might need save button on FE to store it, instead of directly doing it

    const text = await generateEmail({ lead, project, tone });

    res.json({ email: text });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: formatZodErrors(error)
      });
    }

    res.status(500).json({ error: "Failed to generate email." });
  }
}