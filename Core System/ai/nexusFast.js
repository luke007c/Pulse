import { askAI } from "../llm.js";

export async function nexusFast(input) {
  return await askAI(`
You are Nexus FAST.

Be extremely short and direct.

User:
${input}
`);
}