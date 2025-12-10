import ky from "ky";
import type { Lead } from "@/types";

export const patchLeadStatus = async (id: string, status: Lead['status']) =>
  await ky.patch<Lead>(`/api/leads/${id}/status`, { json: ({ status }) }).json();