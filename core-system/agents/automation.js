import { processReplies } from "./replyProcessor.js";
import { runFollowUps } from "./followUp.js";

export async function runAutomation() {

  console.log("Checking replies...");
  await processReplies();

  console.log("Running follow-ups...");
  await runFollowUps();

  console.log("Cycle complete");
}