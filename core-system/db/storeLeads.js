import fs from "fs";

const PATH = "./Core System/db/leads.json";

export function saveLeads(leads) {
  fs.writeFileSync(PATH, JSON.stringify(leads, null, 2));
}

export function getLeads() {
  if (!fs.existsSync(PATH)) return [];
  return JSON.parse(fs.readFileSync(PATH, "utf-8"));
}

export function updateLead(email, updates) {
  const leads = getLeads();

  const updated = leads.map(l => {
    if (l.email === email) {
      return { ...l, ...updates };
    }
    return l;
  });

  saveLeads(updated);
}