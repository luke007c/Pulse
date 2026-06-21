import { askAI } from "../llm.js";

export async function nexusSmart(input) {
  return await askAI(`
You are Nexus SMART.

Be detailed, accurate, and structured.

User:
${input}
`);
}