import { getExact, setExact } from "../cache/exactCache.js";
import { getSemantic, setSemantic } from "../cache/semanticCache.js";
import { getSpec, setSpec } from "../cache/specCache.js";

import { route } from "../ai/router.js";
import { addJob } from "../queue/jobQueue.js";

export async function handleRequest(input) {

  // ⚡ 1. SPEC CACHE (FASTEST)
  const spec = getSpec(input);
  if (spec) return spec;

  // ⚡ 2. EXACT CACHE
  const exact = getExact(input);
  if (exact) return exact;

  // ⚡ 3. SEMANTIC CACHE
  const semantic = getSemantic(input);
  if (semantic) return semantic;

  // ⚡ 4. AI ROUTER
  const response = await route(input);

  // ⚡ STORE ALL CACHE LEVELS
  setExact(input, response);
  setSemantic(input, response);
  setSpec(input, response);

  // ⚡ BACKGROUND WORK (NO BLOCKING)
  addJob({ input, output: response });

  return response;
}