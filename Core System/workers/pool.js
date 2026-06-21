import { Worker } from "worker_threads";

export function runWorker(data) {
  return new Promise((resolve, reject) => {

    const worker = new Worker(new URL("./worker.js", import.meta.url));

    worker.postMessage(data);

    worker.on("message", resolve);
    worker.on("error", reject);

  });
}