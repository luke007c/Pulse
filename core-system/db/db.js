import Database from "better-sqlite3";

export const db = new Database("pulse.db");

// -------------------------
// INIT TABLES
// -------------------------
db.exec(`
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  website TEXT,
  email TEXT,
  score INTEGER,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_name TEXT,
  step INTEGER,
  last_sent DATETIME,
  status TEXT
);
`);