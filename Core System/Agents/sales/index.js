import { askAI } from "../../llm.js";
import { safeParseAI } from "../../utils/safeParse.js";

export async function sales(researchData, builderData) {

  const prompt = `
You are a SALES OUTREACH AI.

Turn this into outreach messages:

RESEARCH:
${JSON.stringify(researchData)}

WEBSITE:
${JSON.stringify(builderData)}

RETURN STRICT JSON ONLY:

{
  "email": {
    "subject": "",
    "body": ""
  },
  "dm": {
    "message": ""
  },
  "followUps": []
}

NO TEXT. ONLY JSON.
`;

  const response = await askAI(prompt);

  return safeParseAI(response, {
    email: { subject: "", body: "" },
    dm: { message: "" },
    followUps: []
  });
}