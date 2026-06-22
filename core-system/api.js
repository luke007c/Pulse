import { getExact, setExact } from "./cache/exactCache.js";
import { getSemantic, setSemantic } from "./cache/semanticCache.js";
import { route } from "./ai/router.js";
import { addJob } from "./queue/jobQueue.js";

export async function handleRequest(input) {

  // ⚡ 1. EXACT CACHE
  const exact = getExact(input);
  if (exact) return exact;

  // ⚡ 2. SEMANTIC CACHE
  const semantic = getSemantic(input);
  if (semantic) return semantic;

  // ⚡ 3. AI ROUTER
  const response = await route(input);

  // ⚡ STORE CACHE IMMEDIATELY
  setExact(input, response);
  setSemantic(input, response);

  // ⚡ BACKGROUND JOB (NON-BLOCKING)
  addJob({ input, output: response });

  return response;
}