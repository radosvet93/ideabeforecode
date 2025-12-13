import { Router } from "express";
import { generateEmailHandler, getEmailsHandler } from "./controller";

export const router = Router();

router.get("/", getEmailsHandler);
router.post("/generate", generateEmailHandler);