import fs from "fs";
import path from "path";

// Always resolve relative to THIS file, not the terminal location
const PATH = path.resolve("Core System", "cache.json");

// =========================
// INIT
// =========================
function init() {
  if (!fs.existsSync(PATH)) {
    fs.mkdirSync(path.dirname(PATH), { recursive: true });
    fs.writeFileSync(PATH, JSON.stringify({ cache: {} }, null, 2));
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
// GET CACHE
// =========================
export function getCache(key) {
  const data = read();

  const entry = data.cache[key];
  if (!entry) return null;

  // expiry check (safe guard)
  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    delete data.cache[key];
    write(data);
    return null;
  }

  entry.hits = (entry.hits || 0) + 1;
  entry.lastAccessed = Date.now();

  write(data);
  return entry.value;
}

// =========================
// SET CACHE
// =========================
export function setCache(key, value, ttlMs = 1000 * 60 * 10) {
  const data = read();

  data.cache[key] = {
    value,
    createdAt: Date.now(),
    lastAccessed: Date.now(),
    hits: 0,
    expiresAt: Date.now() + ttlMs
  };

  write(data);
}

// =========================
// DELETE CACHE ITEM
// =========================
export function deleteCache(key) {
  const data = read();
  delete data.cache[key];
  write(data);
}

// =========================
// CLEANUP EXPIRED
// =========================
export function cleanupCache() {
  const data = read();
  const now = Date.now();

  for (const key of Object.keys(data.cache)) {
    const item = data.cache[key];
    if (!item?.expiresAt || item.expiresAt < now) {
      delete data.cache[key];
    }
  }

  write(data);
}