import fs from "fs";

const LOG_PATH = "./Core System/logs.txt";

// =========================
// LOG LEVELS
// =========================
const prefixes = {
  info: "[INFO]",
  success: "[SUCCESS]",
  warn: "[WARN]",
  error: "[ERROR]",
  pulse: "[PULSE]",
  debug: "[DEBUG]",
  system: "[SYSTEM]"
};

// =========================
// WRITE TO FILE (OPTIONAL TRACE)
// =========================
function writeToFile(line) {
  try {
    fs.appendFileSync(LOG_PATH, line + "\n");
  } catch (err) {
    // fail silently (logging must never crash system)
  }
}

// =========================
// MAIN LOGGER
// =========================
export function log(message, type = "info", context = {}) {

  const time = new Date().toISOString();
  const prefix = prefixes[type] || "[LOG]";

  // =========================
  // STRUCTURED LOG OBJECT
  // =========================
  const logObject = {
    time,
    type,
    message,
    context
  };

  // =========================
  // CONSOLE OUTPUT (HUMAN)
  // =========================
  console.log(`${prefix} ${time} - ${message}`);

  // =========================
  // SYSTEM TRACE (OPTIONAL DEBUG MODE)
  // =========================
  if (process.env.PULSE_DEBUG === "true") {
    console.log("🧠 TRACE:", JSON.stringify(logObject, null, 2));
  }

  // =========================
  // FILE LOGGING (FOR ANALYTICS / DEBUGGING)
  // =========================
  writeToFile(JSON.stringify(logObject));
}