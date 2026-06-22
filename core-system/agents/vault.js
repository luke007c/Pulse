import fs from "fs";
import { embed } from "../embeddings.js";

const PATH = "./Core System/vault.json";

// =========================
// SAFE INIT
// =========================
function initVault() {
  if (!fs.existsSync(PATH)) {
    fs.writeFileSync(PATH, JSON.stringify({ memory: [] }, null, 2));
  }
}

// =========================
// READ / WRITE
// =========================
function readVault() {
  initVault();
  return JSON.parse(fs.readFileSync(PATH, "utf-8"));
}

function writeVault(data) {
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}

// =========================
// COSINE SIMILARITY (SAFE)
// =========================
function similarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;

  let dot = 0, magA = 0, magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

// =========================
// CLASSIFY MEMORY
// =========================
function classify(text) {
  const t = text.toLowerCase();

  if (t.includes("build") || t.includes("app") || t.includes("project"))
    return "task";

  if (t.includes("what") || t.includes("means") || t.includes("is"))
    return "semantic";

  return "episodic";
}

// =========================
// TAG EXTRACTION (IMPROVED)
// =========================
function extractTags(text) {
  const t = text.toLowerCase();
  const tags = [];

  const tagMap = [
    "app",
    "website",
    "business",
    "lead",
    "automation",
    "code",
    "ai"
  ];

  for (const tag of tagMap) {
    if (t.includes(tag)) tags.push(tag);
  }

  return tags;
}

// =========================
// BUSINESS OPPORTUNITY DETECTION
// =========================
function detectOpportunity(text) {
  const t = text.toLowerCase();

  const signals = [
    "no website",
    "booking",
    "manual",
    "outdated",
    "appointment",
    "gym",
    "barber",
    "clinic",
    "shop",
    "customers",
    "phone only"
  ];

  const score = signals.reduce((acc, s) => acc + (t.includes(s) ? 1 : 0), 0);

  return {
    isOpportunity: score >= 2,
    score
  };
}

// =========================
// MEMORY COMPRESSION (SAFE MERGE)
// =========================
function similarityCluster(memory, threshold = 0.88) {
  const clusters = [];

  for (const item of memory) {
    let placed = false;

    for (const cluster of clusters) {
      const sim = similarity(item.vector, cluster.rep.vector);

      if (sim > threshold) {
        cluster.items.push(item);
        placed = true;
        break;
      }
    }

    if (!placed) {
      clusters.push({
        rep: item,
        items: [item]
      });
    }
  }

  return clusters;
}

function summariseCluster(cluster) {
  return {
    id: Date.now() + Math.random(),
    type: "compressed",
    text: cluster.items.map(i => i.text).join(" | "),
    vector: cluster.rep.vector,
    importance:
      cluster.items.reduce((a, b) => a + (b.importance || 1), 0) /
      cluster.items.length,
    createdAt: Date.now(),
    accessCount: 0
  };
}

function compressMemory(data) {
  if (data.memory.length < 80) return data;

  const clusters = similarityCluster(data.memory);
  data.memory = clusters.map(summariseCluster);

  return data;
}

// =========================
// MAIN VAULT API
// =========================
export async function vault(action, payload = {}) {

  const data = readVault();

  // =========================
  // STORE
  // =========================
  if (action === "store") {

    if (!payload.user) return;

    const vector = await embed(payload.user);

    const baseEntry = {
      id: Date.now() + Math.random(),
      type: classify(payload.user),

      text: payload.user,
      response: payload.response,

      vector,

      tags: extractTags(payload.user),

      importance: 1,
      createdAt: Date.now(),
      lastAccessed: Date.now(),
      accessCount: 0
    };

    data.memory.push(baseEntry);

    // -------------------------
    // OPPORTUNITY MEMORY LAYER
    // -------------------------
    const opp = detectOpportunity(payload.user);

    if (opp.isOpportunity) {
      data.memory.push({
        ...baseEntry,
        id: Date.now() + Math.random(),
        type: "opportunity",
        importance: 3,
        tags: ["business", "opportunity"]
      });
    }

    // -------------------------
    // AUTO COMPRESSION
    // -------------------------
    if (data.memory.length % 25 === 0) {
      const compressed = compressMemory(data);
      data.memory = compressed.memory;
    }

    writeVault(data);
    return baseEntry;
  }

  // =========================
  // TOUCH (USAGE BOOST)
  // =========================
  if (action === "touch") {

    const m = data.memory.find(x => x.id === payload.id);

    if (m) {
      m.accessCount += 1;
      m.lastAccessed = Date.now();
      m.importance = Math.min(5, (m.importance || 1) + 0.05);
      writeVault(data);
    }

    return;
  }

  // =========================
  // SEMANTIC SEARCH
  // =========================
  if (action === "get") {

    const query = payload?.query;
    if (!query) return data.memory.slice(-10);

    const queryVector = await embed(query);

    return data.memory
      .map(m => {

        const sim = similarity(queryVector, m.vector);

        const ageDays = (Date.now() - m.createdAt) / 86400000;
        const timeDecay = Math.exp(-0.15 * ageDays);

        const usageBoost = 1 + Math.log(1 + (m.accessCount || 0));
        const importanceBoost = 1 + (m.importance || 1) * 0.3;

        let typeBoost = 1;
        if (m.type === "task") typeBoost = 1.3;
        if (m.type === "semantic") typeBoost = 1.2;
        if (m.type === "opportunity") typeBoost = 1.4;

        const score =
          sim *
          timeDecay *
          usageBoost *
          importanceBoost *
          typeBoost;

        return { ...m, score };
      })

      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }

  return data.memory;
}