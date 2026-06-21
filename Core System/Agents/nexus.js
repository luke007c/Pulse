import { askAI } from "../llm.js";

function isFast(input) {
  return input.length < 50;
}

// -------------------------
// INTENT DETECTION
// -------------------------
function detectIntent(input) {
  const t = input.toLowerCase();

  if (t.includes("find") || t.includes("research")) return "pipeline";
  if (t.includes("gym") || t.includes("business")) return "pipeline";
  if (t.includes("build") || t.includes("website")) return "pipeline";
  if (t.includes("sell") || t.includes("email") || t.includes("outreach")) return "pipeline";

  return "chat";
}

// -------------------------
// MAIN NEXUS
// -------------------------
export async function nexus(input, onToken, agents = {}) {

  const intent = detectIntent(input);
  const fast = isFast(input);

  // -------------------------
  // CHAT MODE (unchanged)
  // -------------------------
  if (intent === "chat") {

    const prompt = fast
      ? `Nexus FAST. Reply in 1 sentence.\nUser: ${input}`
      : `Nexus SMART. Be concise.\nUser: ${input}`;

    let full = "";

    const stream = askAI(prompt, (token) => {
      full += token;
      onToken(token);
    });

    await stream;

    return {
      type: "chat",
      content: full
    };
  }

  // -------------------------
  // FULL PIPELINE MODE
  // -------------------------
  const researcher = agents.researcher;
  const builder = agents.builder;
  const sales = agents.sales;

  if (!researcher || !builder || !sales) {
    return {
      error: "Agents not wired into Nexus"
    };
  }

  // 1. RESEARCH
  const researchData = await researcher(input);

  // 2. BUILD (uses your builder system internally)
  const builderData = await builder(researchData);

  // 3. SALES
  const salesData = await sales(researchData, builderData);

  // STREAM FINAL OUTPUT (simple UX layer)
  const final = {
    research: researchData,
    build: builderData,
    sales: salesData
  };

  const text = JSON.stringify(final, null, 2);
  const words = text.split(" ");

  for (const w of words) {
    onToken(w + " ");
    await new Promise(r => setTimeout(r, 5));
  }

  return {
    type: "pipeline_result",
    content: final
  };
}