import { getLeads, updateLead } from "../db/storeLeads.js";

export function matchReplyToLead(emailText) {

  const leads = getLeads();

  // simple matching (we improve later)
  const found = leads.find(l =>
    emailText.includes(l.name) ||
    emailText.includes(l.email)
  );

  return found;
}

export function attachReplyToLead(lead, classification, emailText) {

  if (!lead) return;

  updateLead(lead.email, {
    status: classification.category,
    lastReply: Date.now(),
    lastReplyText: emailText
  });
}