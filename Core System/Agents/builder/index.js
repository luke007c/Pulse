import { askAI } from "../../llm.js";
import { generateFiles } from "./fileGenerator.js";
import { generateUI } from "./uiBlocks.js";
import { safeParseAI } from "../../utils/safeParse.js";

export async function builder(researchData) {

  const prompt = `
You are a WEBSITE BUILDER AI.

Convert this into a website plan:

${JSON.stringify(researchData, null, 2)}

RETURN STRICT JSON ONLY:

{
  "businessName": "",
  "homepage": {
    "headline": "",
    "subheadline": "",
    "cta": ""
  },
  "features": [],
  "design": "modern"
}

NO TEXT. JSON ONLY.
`;

  const response = await askAI(prompt);

  const data = safeParseAI(response, {
    businessName: "unknown"
  });

  return {
    ...data,
    files: generateFiles(data),
    ui: generateUI(data)
  };
}