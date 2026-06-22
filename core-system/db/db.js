import fs from "fs";

const LEADS_FILE = "./db/leads.json";
const RUNS_FILE = "./db/runs.json";

function read(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// -------------------------
export function saveLead(lead) {
  const leads = read(LEADS_FILE);
  leads.push({ ...lead, createdAt: new Date().toISOString() });
  write(LEADS_FILE, leads);
}

// -------------------------
export function getLeads() {
  return read(LEADS_FILE);
}

// -------------------------
export function saveRun(run) {
  const runs = read(RUNS_FILE);
  runs.push({ ...run, createdAt: new Date().toISOString() });
  write(RUNS_FILE, runs);
}