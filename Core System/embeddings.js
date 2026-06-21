import { pipeline } from "@xenova/transformers";

let embedder = null;

// =========================
// EMBEDDING CACHE (VERY IMPORTANT)
// =========================
const embedCache = new Map();

// =========================
// INIT MODEL
// =========================
export async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embedder;
}

// =========================
// MAIN EMBED FUNCTION
// =========================
export async function embed(text) {

  if (!text) return [];

  const cleaned = String(text).slice(0, 2000).trim();

  // =========================
  // CACHE HIT (FAST PATH)
  // =========================
  if (embedCache.has(cleaned)) {
    return embedCache.get(cleaned);
  }

  try {
    const model = await getEmbedder();

    const output = await model(cleaned, {
      pooling: "mean",
      normalize: true
    });

    const vector = Array.from(output.data);

    // cache result
    embedCache.set(cleaned, vector);

    // prevent memory explosion
    if (embedCache.size > 5000) {
      const firstKey = embedCache.keys().next().value;
      embedCache.delete(firstKey);
    }

    return vector;

  } catch (err) {
    console.error("Embedding error:", err);

    // fallback: zero vector (prevents system crash)
    return new Array(384).fill(0);
  }
}