import fs from "fs";

const DB_PATH = "./Core System/data/userMemory.json";

// =========================
// INIT DB
// =========================
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync("./Core System/data", { recursive: true });
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify({ users: {} }, null, 2),
      "utf-8"
    );
  }
}

function readDB() {
  initDB();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

// =========================
// ENSURE USER
// =========================
function ensureUser(db, userId) {
  if (!db.users[userId]) {
    db.users[userId] = {
      memory: [],
      preferences: {},
      history: []
    };
  }
  return db.users[userId];
}

// =========================
// GET USER MEMORY
// =========================
export function getUserMemory(userId) {
  const db = readDB();
  const user = ensureUser(db, userId);
  writeDB(db);
  return user;
}

// =========================
// ADD MEMORY
// =========================
export function addUserMemory(userId, entry) {
  const db = readDB();
  const user = ensureUser(db, userId);

  user.memory.push({
    text: entry,
    timestamp: Date.now()
  });

  // keep last 200 memories
  if (user.memory.length > 200) {
    user.memory.shift();
  }

  writeDB(db);
}

// =========================
// ADD HISTORY (NEW)
// =========================
export function addUserHistory(userId, item) {
  const db = readDB();
  const user = ensureUser(db, userId);

  user.history.push({
    ...item,
    timestamp: Date.now()
  });

  // keep last 500 history entries
  if (user.history.length > 500) {
    user.history.shift();
  }

  writeDB(db);
}

// =========================
// UPDATE PREFERENCES
// =========================
export function updateUserPreferences(userId, prefs) {
  const db = readDB();
  const user = ensureUser(db, userId);

  user.preferences = {
    ...user.preferences,
    ...prefs
  };

  writeDB(db);
}