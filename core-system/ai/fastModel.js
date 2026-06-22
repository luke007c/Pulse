import { askAI } from "../llm.js";

export async function fastModel(input) {
  return await askAI(`
You are Nexus FAST.

Be short and direct.

User:
${input}
`);
}