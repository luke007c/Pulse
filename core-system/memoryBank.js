const memoryBank = new Map();

/**
 * Stores "intent-like memory"
 */
export function storeMemory(input, response) {
  const key = normalize(input);
  memoryBank.set(key, {
    response,
    time: Date.now()
  });
}

/**
 * Try to recall exact meaning match
 */
export function recallMemory(input) {
  const key = normalize(input);
  return memoryBank.get(key)?.response || null;
}

/**
 * lightweight normalization
 */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .sort()
    .join(" ");
}