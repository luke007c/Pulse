import { vault } from "./agents/vault.js";
import { findRelevantProjects } from "./memory.js";

// =========================
// MEMORY MERGE ENGINE
// =========================
export async function memoryEngine(query, options = {}) {

  const limit = options.limit || 8;

  // =========================
  // 1. VAULT (semantic memory)
  // =========================
  const vaultResults = await vault("get", { query });

  // =========================
  // 2. PROJECT MEMORY (structured memory)
  // =========================
  const projectResults = await findRelevantProjects(query);

  // =========================
  // 3. NORMALISE VAULT RESULTS
  // =========================
  const normalisedVault = vaultResults.map(v => ({
    source: "vault",
    id: v.id,
    text: v.text,
    type: v.type,
    score: v.score,
    importance: v.importance || 1,
    createdAt: v.createdAt
  }));

  // =========================
  // 4. NORMALISE PROJECT RESULTS
  // =========================
  const normalisedProjects = projectResults.map(p => ({
    source: "project",
    id: p.id,
    text: p.name,
    data: p.data,
    score: p.score,
    importance: p.importance || 1,
    createdAt: p.created
  }));

  // =========================
  // 5. MERGE BOTH STREAMS
  // =========================
  const merged = [...normalisedVault, ...normalisedProjects];

  // =========================
  // 6. GLOBAL RE-RANKING
  // =========================
  const ranked = merged.map(item => {

    const recencyBoost =
      1 / (1 + (Date.now() - new Date(item.createdAt)) / 86400000);

    const importanceBoost = 1 + (item.importance || 1) * 0.3;

    const sourceBoost =
      item.source === "vault" ? 1.2 : 1.0;

    const finalScore =
      (item.score || 0.5) *
      recencyBoost *
      importanceBoost *
      sourceBoost;

    return {
      ...item,
      finalScore
    };
  });

  // =========================
  // 7. RETURN TOP RESULTS
  // =========================
  return ranked
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, limit);
}