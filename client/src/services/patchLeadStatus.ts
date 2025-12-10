import type { Lead } from "@/types";
import ky from "ky";

export const patchLeadStatus = async (id: string, status: Lead['status']) =>
  await ky.patch<Lead>(`/api/leads/${id}/status`, { json: status }).json();