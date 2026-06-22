import { upsertLead } from "../utils/crm.js";
import { saveLead } from "../utils/db.js";
import { ollama } from "../llm/ollama.js";

function detectIntent(input = "") {
  const t = input.toLowerCase();

  const pipelineWords = [
    "find","build","research","gym",
    "business","companies","leads",
    "email","sales","outreach"
  ];

  return pipelineWords.some(w => t.includes(w))
    ? "pipeline"
    : "chat";
}

function scoreLead(b = {}) {
  let score = 50;

  if (b.name && b.name !== "unknown") score += 15;
  if (b.website) score += 10;
  if (Array.isArray(b.emails) && b.emails.length) score += 20;
  if (b.location && b.location !== "unknown") score += 10;

  return Math.min(100, score);
}

export async function nexus(input, agents = {}) {

  const mode = detectIntent(input);

  // ---------------- CHAT ----------------
  if (mode === "chat") {
    const reply = await ollama(input);

    return {
      type: "chat",
      content: reply
    };
  }

  const { researcher, builder, sales } = agents;

  if (!researcher || !builder || !sales) {
    return {
      type: "error",
      error: "Missing agents"
    };
  }

  try {

    // ---------------- RESEARCH ----------------
    let raw = await researcher(input);
    let businesses = raw?.businesses || [];

    if (!businesses.length) {
      businesses = [{
        name: "Default Business",
        website: "https://example.com",
        emails: []
      }];
    }

    const leads = businesses.slice(0, 5).map(b => ({
      ...b,
      score: scoreLead(b)
    }));

    // ---------------- STORE ----------------
    leads.forEach(l => {
      upsertLead(l);
      saveLead(l);
    });

    // ---------------- BUILD ----------------
    const build = await builder(leads);

    // ---------------- SALES ----------------
    const salesResult = await sales(leads, build);

    return {
      type: "pipeline_result",
      content: {
        research: leads,
        build,
        sales: salesResult
      }
    };

  } catch (err) {
    return {
      type: "pipeline_result",
      content: {
        error: err.message
      }
    };
  }
}