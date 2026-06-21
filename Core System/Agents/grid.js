import { askAI } from "../llm.js";

export async function grid(input) {

  // =========================
  // 1. TURN INPUT INTO PLAN
  // =========================
  const prompt = `
You are Grid, the planning + execution system of Pulse.

Convert the input into a structured JSON execution plan.

You MUST return ONLY valid JSON.

Each step must include:
- type (string)
- task (string)
- data (object or string)

Supported types:
- lead_generation
- outreach
- build_app
- memory_write
- tool

---

INPUT:
${input}

---

FORMAT:
{
  "goal": "",
  "steps": [
    {
      "type": "",
      "task": "",
      "data": {}
    }
  ]
}
`;

  const raw = await askAI(prompt);

  let plan;

  // =========================
  // 2. SAFE PARSING
  // =========================
  try {
    plan = JSON.parse(raw);
  } catch (err) {

    // fallback if AI fails JSON format
    plan = {
      goal: "unstructured",
      steps: [
        {
          type: "chat",
          task: "fallback response",
          data: raw
        }
      ]
    };
  }

  return plan;
}