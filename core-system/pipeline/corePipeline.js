import { researcher } from "../agents/researcher/index.js";
import { scorer } from "../agents/scorer.js";
import { builder } from "../agents/builder/index.js";
import { saveMemory } from "../utils/memoryStore.js";

export async function corePipeline(input) {

  // -------------------------
  // 1. RESEARCH (STRICT LOCAL ONLY)
  // -------------------------
  const raw = await researcher(input);

  const businesses = raw?.businesses || [];

  // -------------------------
  // 2. SCORE + RANK
  // -------------------------
  const scored = scorer(businesses);

  // -------------------------
  // 3. FILTER HIGH VALUE LEADS
  // -------------------------
  const leads = scored
    .filter(b => b.score >= 50)
    .slice(0, 8);

  // -------------------------
  // 4. BUILD DEMOS
  // -------------------------
  const build = await builder(leads);

  // -------------------------
  // 5. MEMORY (LEARNING LAYER)
  // -------------------------
  saveMemory({
    input,
    leads,
    timestamp: Date.now()
  });

  // -------------------------
  // 6. FINAL OUTPUT
  // -------------------------
  return {
    success: true,
    leads,
    build
  };
}