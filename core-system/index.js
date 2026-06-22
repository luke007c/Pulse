import readline from "readline";

import { nexus } from "./agents/nexus.js";
import { judge } from "./agents/judge.js";

import { getCache, setCache } from "./cache.js";

import { runPipeline } from "../saas/routes/pipeline.js";
import { startAutopilot } from "./autopilot.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\n⚡ Pulse Online (v1.4 - Autonomous System Enabled)\n");

// =========================
// TYPING EFFECT
// =========================
function typeText(text, speed = 6) {
  return new Promise(resolve => {

    let i = 0;

    const interval = setInterval(() => {

      process.stdout.write(text[i] || "");
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        process.stdout.write("\n");
        resolve();
      }

    }, speed);
  });
}

// =========================
// MAIN LOOP
// =========================
function ask() {

  rl.question("> ", async (input) => {

    if (!input.trim()) return ask();

    const start = Date.now();

    console.log("\n⚡ Processing...\n");

    try {

      // =========================
      // 🤖 AUTOPILOT COMMANDS
      // =========================
      if (input === "autopilot start") {
        startAutopilot(60000); // every 60s
        console.log("🤖 Autopilot started (60s interval)");
        return ask();
      }

      if (input === "autopilot stop") {
        console.log("🛑 Autopilot stopping...");
        process.exit(0);
      }

      // =========================
      // 🔁 PIPELINE MODE
      // =========================
      if (input.startsWith("run ")) {

        console.log("🔁 Pipeline mode activated...\n");

        const result = await runPipeline(input.replace("run ", ""));

        console.log("\n🚀 PIPELINE COMPLETE\n");

        console.log(JSON.stringify(result, null, 2));

        console.log("\n----------------------");
        console.log(`⚡ Response time: ${Date.now() - start}ms`);
        console.log("----------------------\n");

        return ask();
      }

      // =========================
      // ⚡ CACHE + NEXUS MODE
      // =========================
      const cached = getCache(input);

      let result;

      if (cached) {
        console.log("⚡ Cache hit");
        result = cached;
      } else {
        result = await nexus(input);
        setCache(input, result);
      }

      // =========================
      // FORMAT OUTPUT
      // =========================
      const output =
        result?.content ||
        result?.response ||
        JSON.stringify(result, null, 2);

      // =========================
      // 🧠 JUDGE QUALITY
      // =========================
      const review = await judge(output);

      await typeText("⚡ Pulse: " + output);

      console.log("\n----------------------");
      console.log(`⚡ Response time: ${Date.now() - start}ms`);
      console.log(`🧠 Quality score: ${review.score}/10`);
      console.log(`📊 Grade: ${review.grade}`);
      console.log("----------------------\n");

    } catch (err) {
      console.log("⚠️ Error:", err.message);
    }

    ask();
  });
}

ask();