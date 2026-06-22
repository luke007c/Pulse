import { askAI } from "../llm.js";

export async function smartModel(input) {
  return await askAI(`
You are Nexus SMART.

Be clear, structured, and helpful.

User:
${input}
`);
}