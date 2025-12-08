import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { router as projectsRouter } from './features/projects';
import { router as leadsRouter } from './features/leads'
import { router as emailsRouter } from './features/emails'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/projects", projectsRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/emails", emailsRouter);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
}); 
