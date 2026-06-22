import { askAI } from "../llm.js";

const memory = [];

// convert text → "semantic signature"
async function embed(text) {
  const res = await askAI(`
Convert this into 10 keywords that represent meaning:

${text}

Return only keywords.
`);

  return res.toLowerCase().split(",").map(s => s.trim());
}

// cosine-like overlap (simple but effective)
function similarity(a, b) {
  const setB = new Set(b);
  let match = 0;

  for (const w of a) {
    if (setB.has(w)) match++;
  }

  return match / Math.max(a.length, 1);
}

export async function storeBrain(input, output) {
  const vec = await embed(input);

  memory.push({
    vec,
    output
  });
}

export async function recallBrain(input) {
  const vec = await embed(input);

  let best = null;
  let score = 0;

  for (const item of memory) {
    const s = similarity(vec, item.vec);
    if (s > score) {
      score = s;
      best = item.output;
    }
  }

  return score > 0.7 ? best : null;
}