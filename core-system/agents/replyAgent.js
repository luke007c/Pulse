import { askAI } from "../../llm.js";

export async function classifyReply(emailText) {

  const prompt = `
You are a sales reply classifier.

Classify this email into ONE category:

- interested
- not_interested
- follow_up_later
- question
- spam

EMAIL:
${emailText}

Return JSON ONLY:

{
  "category": "",
  "reason": ""
}
`;

  const response = await askAI(prompt);

  try {
    return JSON.parse(response);
  } catch {
    return {
      category: "unknown",
      reason: "parse_error"
    };
  }
}