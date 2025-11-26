import { Router, type Request, type Response } from "express";
import { listProspects } from "./model";
import type { Prospect } from "@shared/types";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const prospects: Prospect[] = await listProspects();

  res.json(prospects);
});