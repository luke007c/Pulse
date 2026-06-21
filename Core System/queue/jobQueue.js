const queue = [];

export function addJob(job) {
  queue.push(job);
}

export function getJob() {
  return queue.shift();
}

export function hasJobs() {
  return queue.length > 0;
}