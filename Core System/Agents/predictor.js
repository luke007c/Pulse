import { askAI } from "../llm.js";

const cache = new Map();

export async function predict(input) {

  const key = input.toLowerCase().split(" ")[0];

  if (cache.has(key)) return cache.get(key);

  const prompt = `
Predict a short helpful response for:

${input}
`;

  const res = await askAI(prompt);

  cache.set(key, res);

  return res;
}