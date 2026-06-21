import { fetchBusinesses } from "./agents/dataSources.js";
import { memoryEngine } from "./memoryEngine.js";

// =========================
// ORCHESTRATOR (DECISION BRAIN)
// =========================
export async function orchestrator(input) {

  const text = input.toLowerCase();

  // =========================
  // 1. MEMORY CONTEXT (IMPORTANT UPGRADE)
  // =========================
  const memory = await memoryEngine(input);

  // =========================
  // 2. BUSINESS DISCOVERY
  // =========================
  const discovered = await fetchBusinesses(input);

  // =========================
  // 3. INTENT DETECTION (IMPROVED)
  // =========================
  const intentData = detectIntent(text);

  // =========================
  // 4. CONFIDENCE SCORE
  // =========================
  const confidence = calculateConfidence(text, intentData.intent);

  // =========================
  // 5. DECISION OUTPUT (STRUCTURED)
  // =========================
  return {
    input,

    intent: intentData.intent,
    confidence,

    memoryContext: memory,

    discoveredBusinesses: discovered,

    actions: {
      shouldScrape: intentData.intent === "business" || text.includes("find"),
      shouldGenerateCode: text.includes("build") || text.includes("create"),
      shouldUseVault: memory.length > 0,
      shouldUseGrid: true,
      shouldStoreMemory: true
    }
  };
}

// =========================
// INTENT DETECTION (UPGRADED)
// =========================
function detectIntent(text) {

  const intents = {
    build: ["build", "create", "make", "develop", "app", "website"],
    business: ["business", "company", "shop", "lead", "client"],
    research: ["what is", "explain", "how", "why"],
    chat: []
  };

  let bestIntent = "chat";
  let bestScore = 0;

  for (const [intent, keywords] of Object.entries(intents)) {

    const score = keywords.reduce(
      (acc, word) => acc + (text.includes(word) ? 1 : 0),
      0
    );

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  return {
    intent: bestIntent,
    score: bestScore
  };
}

// =========================
// CONFIDENCE ENGINE
// =========================
function calculateConfidence(text, intent) {

  let score = 0.5;

  if (text.length > 50) score += 0.1;
  if (text.length > 150) score += 0.1;

  if (intent !== "chat") score += 0.2;

  if (text.includes("build") || text.includes("create")) {
    score += 0.2;
  }

  if (text.includes("business") || text.includes("client")) {
    score += 0.2;
  }

  return Math.min(score, 1);
}