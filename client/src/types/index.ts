export type StatusUnion = "new" | "contacted" | "interested" | "closed" | "declined";

export interface Project {
  id: string,
  name: string,
  description: string,
  createdAt: Date
}

export interface Lead {
  id: string,
  name: string,
  email: string,
  status: StatusUnion,
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