import { parentPort } from "worker_threads";
import { addJob, getJob, hasJobs } from "../queue/jobQueue.js";
import { storeMemory } from "../storage/memoryStore.js";

async function process() {

  while (hasJobs()) {
    const job = getJob();
    if (!job) continue;

    await storeMemory(job.input, job.output);
  }

  parentPort.postMessage(true);
}

parentPort.on("message", async () => {
  await process();
});