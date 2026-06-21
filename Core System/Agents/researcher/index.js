import { askAI } from "../../llm.js";
import { safeParseAI } from "../../utils/safeParse.js";

export async function researcher(input) {

  const prompt = `
You are a BUSINESS RESEARCH AGENT.

Find real gyms or businesses related to:
${input}

RETURN STRICT JSON ONLY:

{
  "businesses": [
    {
      "name": "",
      "type": "",
      "location": "",
      "problem": "",
      "opportunity": ""
    }
  ]
}

RULES:
- JSON ONLY
- NO explanation
- NO markdown
`;

  const response = await askAI(prompt);

  return safeParseAI(response, {
    businesses: []
  });
}