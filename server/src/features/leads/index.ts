import { Router, type Response, type Request } from "express";
import { leadsSelectSchema, listLeads, statusEnumValues, updateLeadStatus, type Status } from "./model";

export const router = Router();

router.get("/", async ({ res }: { res: Response }) => {
  const leadDB = await listLeads();

  const leadDto = leadDB.map(row => leadsSelectSchema.parse({
    id: row.id,
    name: row.name,
    email: row.email,
    status: row.status,
    jobTitle: row.jobTitle,
    company: row.company,
    notes: row.notes,
    projectId: row.projectId,
    createdAt: row.createdAt
  }))

  res.json(leadDto);
});

router.patch("/:id/status", async (req: Request, res: Response) => {
  const id = req.params.id;
  const newStatus = req.body?.status as Status;

  if (!statusEnumValues.includes(newStatus)) {
    return res.status(400).json({ error: "Invalid status provided." });
  }

  try {
    const [updated] = await updateLeadStatus(id, newStatus);

    if (!updated) {
      return res.status(404).json({ error: "Lead not found." });
    }

    const updatedLeadDto = leadsSelectSchema.parse(updated);

    res.json(updatedLeadDto);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead status." });
  }
});