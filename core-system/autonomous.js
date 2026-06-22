import { orchestrator } from "./orchestrator.js";
import { grid } from "./agents/grid.js";
import { judge } from "./agents/judge.js";
import { vault } from "./vault.js";

const TASK_QUEUE = [
  "Build a landing page for a pizza shop",
  "Design an AI assistant architecture",
  "Create a task management system"
];

// =========================
// AUTONOMOUS RUNNER
// =========================
export async function runAutonomous() {

  const results = [];

  for (const task of TASK_QUEUE) {

    console.log("\n🚀 AUTONOMOUS TASK:", task);

    // =========================
    // 1. ORCHESTRATE INTENT
    // =========================
    const system = await orchestrator(task);

    // =========================
    // 2. CREATE EXECUTION PLAN (GRID)
    // =========================
    const plan = await grid(task);

    console.log("📋 PLAN CREATED:", plan.goal || "no goal");

    // =========================
    // 3. SIMULATED EXECUTION OUTPUT
    // (replace later with real grid executor)
    // =========================
    const executionResult = {
      task,
      system,
      plan,
      output: `Executed: ${task}`
    };

    // =========================
    // 4. JUDGE QUALITY
    // =========================
    const review = await judge(executionResult.output);

    console.log("🧠 JUDGE SCORE:", review.score);

    // =========================
    // 5. STORE IN VAULT
    // =========================
    await vault("store", {
      user: task,
      response: {
        system,
        plan,
        executionResult,
        review
      }
    });

    // =========================
    // 6. RETRY LOGIC (IMPORTANT UPGRADE)
    // =========================
    if (review.score < 6) {
      console.log("⚠️ LOW QUALITY → RE-PLANNING...");

      const improvedPlan = await grid(
        task + " but improve clarity, structure and usefulness"
      );

      console.log("🔁 IMPROVED PLAN:", improvedPlan.goal || "updated plan");

      results.push({
        task,
        status: "improved",
        plan,
        improvedPlan
      });

    } else {
      results.push({
        task,
        status: "success",
        review
      });
    }
  }

  // =========================
  // FINAL SUMMARY
  // =========================
  return {
    completed: results.length,
    results
  };
}