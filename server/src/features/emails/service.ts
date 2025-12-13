import OpenAI from "openai";
import type { EmailGenerateInput } from "src/features/emails/schema";

const toneInstructions = {
  professional: "Use a professional, business-focused tone. Be concise and direct.",
  friendly: "Use a warm, friendly tone. Be personable and approachable.",
  casual: "Use a casual, conversational tone. Sound like a peer.",
  urgent: "Convey urgency and importance. Use compelling language.",
} as const

export async function generateEmail({ lead, project, tone }: EmailGenerateInput) {

  // TODO: Can even get the web_search_view tool to research the company and person on the internet??

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
  Use British English.
  Avoid the em dash ("—").
  
  Write a short, personalised outreach email to gauge interest in a potential product or tool that is currently being explored.
  
  The email should:
  - Introduce the project briefly and clearly.
  - Explain how it could help this specific person in their role or company.
  - Show you understand their context based on the details below.
  - Make it clear you're validating the idea before building it.
  - Invite them to share thoughts or hop on a quick call.
  - Keep it under 150 words.
  - Sound natural, helpful, and conversational—not salesy.
  
  Lead details:
  - Name: ${lead.name}
  - Email: ${lead.email}
  - Company: ${lead.company || "Not specified"}
  - Job Title: ${lead.jobTitle || "Not specified"}
  - Notes: ${lead.notes || "Not provided"}
  
  Project concept:
  - Name: ${project.name}
  - Description: ${project.description}
  
  Tone: ${toneInstructions[tone]}
  
  Output constraints:
  - Return ONLY an HTML fragment suitable for a rich-text editor (Lexical).
  - Use simple semantic tags only (<p>, <strong>, <em>, <br>, <a>).
  - Do NOT include <html>, <body>, <head>, <style>, or any wrapper tags.
  
  Structure:
  <p><strong>Subject: ...</strong></p>
  <p>Body:</p>
  <p>...</p>
  `.trim();

  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: prompt,
  });

  const text = response.output_text;

  if (!text) {
    throw new Error("OpenAI returned an empty response.");
  }

  return text;
}