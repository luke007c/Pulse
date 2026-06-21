import fs from "fs";

const PATH = "./Core System/autopilot-memory.json";

// =========================
// INIT
// =========================
function init() {
  if (!fs.existsSync(PATH)) {
    fs.writeFileSync(PATH, JSON.stringify({
      gyms: {},
      stats: {
        totalRuns: 0,
        totalProcessed: 0
      }
    }, null, 2));
  }
}

function read() {
  init();
  return JSON.parse(fs.readFileSync(PATH, "utf-8"));
}

function write(data) {
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}

// =========================
// CHECK DUPLICATE
// =========================
export function hasProcessedGym(name) {
  const data = read();
  return !!data.gyms[name.toLowerCase()];
}

// =========================
// SCORE HISTORY
// =========================
export function getGymScoreHistory(name) {
  const data = read();
  return data.gyms[name.toLowerCase()] || null;
}

// =========================
// MARK + LEARN FROM RESULT
// =========================
export function markGymProcessed(name, result = {}) {
  const data = read();

  const key = name.toLowerCase();

  const previous = data.gyms[key];

  const newScore = result?.score ?? result?.gym?.opportunity_score ?? 0;

  // =========================
  // SIMPLE LEARNING MODEL
  // =========================
  let learnedWeight = 1;

  if (previous) {
    // reinforce good gyms, reduce bad ones
    learnedWeight = (previous.learnedWeight || 1) * 0.9 + (newScore / 10) * 0.1;
  } else {
    learnedWeight = newScore / 10;
  }

  data.gyms[key] = {
    name,
    lastScore: newScore,
    learnedWeight,
    timesProcessed: (previous?.timesProcessed || 0) + 1,
    lastRun: Date.now(),
    result
  };

  data.stats.totalProcessed += 1;
  data.stats.totalRuns += 1;

  write(data);
}

// =========================
// RANKING FUNCTION (IMPORTANT)
// =========================
export function rankGym(gym) {
  const data = read();

  const history = data.gyms[gym.name.toLowerCase()];

  const baseScore = gym.opportunity_score || 0;

  const learnedBoost = history?.learnedWeight || 0;

  // final intelligence score
  return baseScore + learnedBoost * 5;
}

// =========================
// STATS
// =========================
export function getAutopilotStats() {
  return read().stats;
}