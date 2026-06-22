import { runAutomation } from "./automation.js";

setInterval(async () => {
  console.log("⚡ Pulse SaaS cycle running...");
  await runAutomation();
}, 1000 * 60 * 10);