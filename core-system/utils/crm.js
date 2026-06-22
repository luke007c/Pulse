const CRM = {
  leads: []
};

// -------------------------
// ADD OR UPDATE LEAD
// -------------------------
export function upsertLead(lead) {
  const existing = CRM.leads.find(l => l.name === lead.name);

  if (existing) {
    Object.assign(existing, lead);
  } else {
    CRM.leads.push({
      name: lead.name,
      score: lead.score || 0,
      status: "new",
      emailSent: false,
      demoClicks: 0,
      lastUpdated: new Date().toISOString(),
      ...lead
    });
  }
}

// -------------------------
// UPDATE STATUS
// -------------------------
export function updateLead(name, updates) {
  const lead = CRM.leads.find(l => l.name === name);
  if (!lead) return;

  Object.assign(lead, updates);
  lead.lastUpdated = new Date().toISOString();
}

// -------------------------
// GET ALL LEADS
// -------------------------
export function getLeads() {
  return CRM.leads;
}