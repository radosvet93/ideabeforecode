import { Router } from "express";
import { getProjectByIdHandler, getProjectsHandler, createProjectHandler } from "./controller";

export const router = Router();

router.get("/", getProjectsHandler);
router.post("/", createProjectHandler);
router.get("/:id", getProjectByIdHandler);