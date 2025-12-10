import ky from 'ky';
import type { Email } from "@/types";

export const fetchEmails = async () => await ky<Email[]>('/api/emails').json();
