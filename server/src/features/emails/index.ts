import { Router } from "express";
import { getEmailsHandler } from "./controller";

export const router = Router();

router.get("/", getEmailsHandler);