import { db } from "../db/db.js";

// -------------------------
export function createCampaign(lead) {
  db.prepare(`
    INSERT INTO campaigns (lead_name, step, status)
    VALUES (?, ?, ?)
  `).run(lead.name, 0, "active");
}

// -------------------------
export function getActiveCampaigns() {
  return db.prepare(`
    SELECT * FROM campaigns WHERE status = 'active'
  `).all();
}

// -------------------------
export function advanceCampaign(name) {
  db.prepare(`
    UPDATE campaigns
    SET step = step + 1,
        last_sent = CURRENT_TIMESTAMP
    WHERE lead_name = ?
  `).run(name);
}