import { getMemory } from "../utils/memoryStore.js";

export function memoryContext() {
  const mem = getMemory();

  return mem.slice(-10); // last 10 interactions
}