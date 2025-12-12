import ky from 'ky';
import type { GenerateEmailPayload } from "@/types";

export const generateEmail = async (payload: GenerateEmailPayload) =>
  await ky.post('/api/emails/generate', { json: payload }).json();