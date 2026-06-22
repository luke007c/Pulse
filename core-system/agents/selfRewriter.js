import fs from "fs";

export function selfRewriter(systemState, memory, project) {

  const issues = [];

  // -------------------------
  // BASIC ANALYSIS
  // -------------------------
  if (!project) {
    issues.push("No code generation output detected");
  }

  if (memory.length < 5) {
    issues.push("Memory context too small for stable reasoning");
  }

  if (!systemState?.discovered?.length) {
    issues.push("No business discovery input active");
  }

  // -------------------------
  // PATCH GENERATION
  // -------------------------
  const patches = [];

  if (issues.includes("No business discovery input active")) {
    patches.push({
      target: "orchestrator.js",
      action: "add",
      code: `
import { businessDiscovery } from "./agents/businessDiscovery.js";

// ensure discovery always runs
const discovered = await businessDiscovery(input);
`
    });
  }

  if (issues.includes("No code generation output detected")) {
    patches.push({
      target: "nexus.js",
      action: "modify",
      note: "force code generation fallback when build intent is detected"
    });
  }

  return {
    issues,
    patches,
    riskLevel: issues.length > 2 ? "medium" : "low",
    recommendation: "apply patches manually or via safe executor"
  };
}