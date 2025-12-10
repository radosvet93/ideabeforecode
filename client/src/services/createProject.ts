import ky from 'ky';
import type { CreateProjectPayload, Project } from "@/types";

export const createProject = async (payload: CreateProjectPayload) =>
  await ky.post<Project>('/api/projects', { json: payload }).json();