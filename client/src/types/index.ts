export const EmailToneValues = ["professional", "friendly", "casual", "urgent"] as const;
export type EmailTone = (typeof EmailToneValues)[number];

export type Status = "new" | "contacted" | "interested" | "closed" | "declined";

export interface Project {
  id: string,
  name: string,
  description: string,
  createdAt: Date
}

export interface Lead {
  id: string,
  name: string,
  phone: string,
  email: string,
  status: Status,
  jobTitle: string,
  company: string,
  notes: string,
  projectId: string,
  createdAt: Date
}

interface EmailCount {
  emailCount: string
}

export interface ProjectLeads extends Project, EmailCount {
  leads: Lead[]
}

export interface Email {
  id: string,
  content: string,
  status: string,
  createdAt: Date
}

type OmitDefaultMeta<T, K extends keyof T = never> = Omit<T, 'id' | 'createdAt' | K>;

export type CreateLeadPayload = OmitDefaultMeta<Lead, 'status'>;
export type CreateProjectPayload = OmitDefaultMeta<Project>;
export interface GenerateEmailPayload {
  project: CreateProjectPayload
  lead: OmitDefaultMeta<Lead, 'projectId'>,
  tone: EmailTone
}