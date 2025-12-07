import { Router, type Response, type Request } from "express";
import { listEmails, emailsSelectSchema } from "./model";

export const router = Router();

router.get("/", async ({ res }: { res: Response }) => {
  const emailDB = await listEmails();

  const emailDto = emailDB.map(row => emailsSelectSchema.parse({
    id: row.id,
    content: row.content,
    tone: row.tone,
    leadId: row.leadId,
    createdAt: row.createdAt
  }))

  res.json(emailDto);
});