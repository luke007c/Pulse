import fs from "fs";

const FILE = "./db/leads.json";

function read() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function saveLead(lead) {
  const data = read();
  data.push({
    ...lead,
    createdAt: new Date().toISOString()
  });
  write(data);
}

export function getLeads() {
  return read();
}