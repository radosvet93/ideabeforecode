import OpenAI from "openai";
import type { EmailGenerateInput } from "src/features/emails/schema";

const toneInstructions = {
  professional: "Use a professional, business-focused tone. Be concise and direct.",
  friendly: "Use a warm, friendly tone. Be personable and approachable.",
  casual: "Use a casual, conversational tone. Sound like a peer.",
  urgent: "Convey urgency and importance. Use compelling language.",
} as const

export async function generateEmailOpenAI({ lead, project, tone }: EmailGenerateInput) {

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

export const generateEmailLocalModel = async ({ lead, project, tone }: EmailGenerateInput) => {

  const prompt = `
You are an experienced UK-based product founder writing short, thoughtful outreach emails.

Your goal is to validate interest in a potential product idea before building it.
This is NOT a sales email.

Writing rules (must follow strictly):
- Use British English spelling and phrasing (organisation, personalise, programme, etc).
- Avoid Americanisms and corporate jargon.
- Do NOT mention "sales", "pitch", "early validation", or "resources".
- Do NOT over-explain or justify why you are emailing.
- Avoid buzzwords and generic phrases.
- Avoid the em dash (—).
- Keep the tone natural, calm, and human.

Task:
Write a concise outreach email to the person below.
The email should briefly introduce the idea, show relevance to their role, and invite a short reply or quick chat.

Lead details:
- Name: ${lead.name}
- Company: ${lead.company || "Not specified"}
- Job Title: ${lead.jobTitle || "Not specified"}
- Notes: ${lead.notes || "Not provided"}

Product idea:
- Name: ${project.name}
- Description: ${project.description}

Tone guidance: ${toneInstructions[tone]}

Length:
- Maximum 120–150 words total.

Output format (strict):
Return plain text only.
No HTML.
No markdown.
No explanations.

Format exactly like this:

Subject: <one clear, human subject line>

Body:
<email body>

End the email naturally with a polite sign-off.
Do not include a signature block.
`.trim();

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.1:8b-instruct-q4_K_M",
      prompt,
      stream: false,
      options: {
        "temperature": 0.65,
        "top_p": 0.9,
        "num_predict": 220
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status}`);
  }

  const data: {
    response?: string;
    done?: boolean;
  } = await response.json();

  if (!data.response) {
    throw new Error("Ollama returned an empty response.");
  }

  return data.response.trim();
}
