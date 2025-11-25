import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { router as prospectsRouter } from './features/prospects'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/prospects", prospectsRouter);

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
}); 
