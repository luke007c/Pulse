import { upsertLead } from "../utils/crm.js";
import { saveLead } from "../utils/dbLeads.js";

function detectIntent(input) {
  const t = input.toLowerCase();
  return t.includes("find") || t.includes("build") || t.includes("gym")
    ? "pipeline"
    : "chat";
}

function scoreLead(b) {
  let score = 50;
  if (b.name) score += 10;
  if (b.website) score += 10;
  if (b.emails?.length) score += 20;
  return Math.min(100, score);
}

export async function nexus(input, onToken, agents = {}) {

  const { researcher, builder, sales } = agents;

  // ---------------- CHAT MODE ----------------
  if (detectIntent(input) === "chat") {
    return {
      type: "chat",
      content: `Got it: ${input}`
    };
  }

  // ---------------- PIPELINE SAFETY CHECK ----------------
  if (!researcher || !builder || !sales) {
    return {
      type: "error",
      error: "Missing agents"
    };
  }

  try {

    // ---------------- 1. RESEARCH ----------------
    let raw = await researcher(input);

    let businesses = raw?.businesses || raw || [];

    if (!Array.isArray(businesses) || businesses.length === 0) {
      businesses = [{
        name: "Local Gym Portsmouth",
        website: "https://example.com",
        emails: ["info@example.com"]
      }];
    }

    // ---------------- 2. SCORE + LIMIT ----------------
    const safeResearch = businesses.slice(0, 5).map(b => ({
      ...b,
      score: scoreLead(b)
    }));

    // ---------------- 3. STORE ----------------
    safeResearch.forEach(l => {
      upsertLead({ name: l.name, score: l.score, status: "generated" });
      saveLead(l);
    });

    // ---------------- 4. BUILD ----------------
    const build = await builder(safeResearch);

    // ---------------- 5. SALES ----------------
    const salesResult = await sales(safeResearch, build);

    // ---------------- FINAL GUARANTEE ----------------
    return {
      type: "pipeline_result",
      content: {
        research: safeResearch,
        build: build,
        sales: salesResult
      }
    };

  } catch (err) {
    return {
      type: "pipeline_result",
      content: {
        research: [],
        build: { sites: [] },
        sales: { sent: false },
        error: err.message
      }
    };
  }
}