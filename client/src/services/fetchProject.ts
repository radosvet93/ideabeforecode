import ky from "ky";
import type { ProjectLeads } from "@/types";

export const fetchProject = async (id: string) => await ky<ProjectLeads>(`/api/projects/${id}`).json();
