import ky from 'ky';
import type { CreateProjectPayload, Project } from "@/types";

export const createProject = async (payload: CreateProjectPayload) =>
  await ky.post<Project>('/api/project', { json: payload }).json();