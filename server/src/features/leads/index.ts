import { Router } from "express";
import { createLeadHandler, deleteLeadHandler, getLeadsHandler, patchLeadStatusHandler } from "./controller";

export const router = Router();

router.get("/", getLeadsHandler);
router.post("/", createLeadHandler);
router.patch("/:id/status", patchLeadStatusHandler);
router.delete("/:id", deleteLeadHandler);