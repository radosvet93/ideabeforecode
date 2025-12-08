import type { Lead } from "@/types";

export const patchLeadStatus = async (id: string, status: Lead['status']): Promise<Lead> => {
  const res = await fetch(`/api/leads/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error('Failed to update lead');

  return res.json() as Promise<Lead>;
};