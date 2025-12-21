import { Router, raw } from "express";
import { createLeadHandler, deleteLeadHandler, getLeadsHandler, patchLeadStatusHandler, uploadLeadsHandler } from "./controller";

export const router = Router();

router.get("/", getLeadsHandler);
router.post("/", createLeadHandler);
router.post("/upload-csv", raw({ type: 'text/csv', limit: '10mb' }), uploadLeadsHandler);
router.patch("/:id/status", patchLeadStatusHandler);
router.delete("/:id", deleteLeadHandler);