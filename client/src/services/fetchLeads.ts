import ky from 'ky';
import type { Lead } from "@/types";

export const fetchLeads = async () => await ky<Lead[]>('/api/leads').json();