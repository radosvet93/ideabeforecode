import ky from 'ky';
import type { Project } from '@/types';

export const fetchProjects = async () => await ky<Project[]>('/api/projects').json();