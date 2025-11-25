import { Router, type Request, type Response } from "express";
import { listProspects, type Prospect } from "./model";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const prospects: Prospect[] = await listProspects();

  res.json(prospects[0]);
});