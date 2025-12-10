import type { ProjectLeads } from "@/types";

export const fetchProject = async (id: string) => {
  const response = await fetch(`/api/projects/${id}`);
  const singleProject = await response.json() as ProjectLeads;

  return singleProject;
};