import { parentPort } from "worker_threads";
import { storeMemory } from "../storage/memoryStore.js";

parentPort.on("message", async ({ input, output }) => {

  try {
    storeMemory(input, output);
    parentPort.postMessage(true);
  } catch {
    parentPort.postMessage(false);
  }
});