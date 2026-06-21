import fs from "fs";

const FILE = "./Core System/db/leads.json";

export function saveLeads(newLeads = []) {
  const existing = JSON.parse(fs.readFileSync(FILE, "utf-8"));

  const merged = [...existing, ...newLeads];

  fs.writeFileSync(FILE, JSON.stringify(merged, null, 2));
  return merged;
}

export function getLeads() {
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}