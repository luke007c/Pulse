import { runPipeline } from "../saas/routes/pipeline.js";
import {
  hasProcessedGym,
  markGymProcessed,
  rankGym
} from "./memory/autopilotMemory.js";

let running = false;

export function startAutopilot(intervalMs = 60000) {

  if (running) {
    console.log("⚠️ Autopilot already running");
    return;
  }

  running = true;

  console.log("\n🧠 PROFIT-OPTIMISED AUTOPILOT STARTED\n");

  setInterval(async () => {

    try {

      console.log("\n🔍 [AUTOPILOT] Searching gyms...\n");

      const result = await runPipeline("find gyms in london");

      const gym = result?.gym;

      if (!gym?.name) {
        console.log("⚠️ No gym found this cycle");
        return;
      }

      // =========================
      // 🚫 DUPLICATE CHECK
      // =========================
      if (hasProcessedGym(gym.name)) {
        console.log(`🚫 Duplicate skipped: ${gym.name}`);
        return;
      }

      // =========================
      // 📊 INTELLIGENT RANKING
      // =========================
      const score = rankGym(gym);

      console.log(`🏋️ Gym: ${gym.name}`);
      console.log(`📊 Intelligence score: ${score.toFixed(2)}`);

      // Only proceed if worth it
      if (score < 4) {
        console.log("⛔ Low value lead skipped");
        markGymProcessed(gym.name, { skipped: true, score });
        return;
      }

      // =========================
      // PROCESS HIGH-VALUE LEAD
      // =========================
      console.log("🚀 High-value lead accepted");

      markGymProcessed(gym.name, {
        preview: result?.website?.preview,
        score,
        upsell: result?.upsell_app
      });

      console.log("\n✅ Cycle complete\n");

      console.log({
        gym: gym.name,
        score,
        preview: result?.website?.preview
      });

    } catch (err) {
      console.log("⚠️ Autopilot error:", err.message);
    }

  }, intervalMs);
}