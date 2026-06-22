import { saveLead, getLeads } from "./db.js";

export function upsertLead(lead) {

  const leads = getLeads();

  const index = leads.findIndex(l => l.name === lead.name);

  if (index !== -1) {
    leads[index] = {
      ...leads[index],
      ...lead
    };
  } else {
    leads.push(lead);
  }

  saveLead(lead);

  return lead;
}