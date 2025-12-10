import ky from 'ky';
import type { CreateLeadPayload, Lead } from "@/types";

export const createLead = async (payload: CreateLeadPayload) =>
  await ky.post<Lead>('/api/leads', { json: payload }).json();