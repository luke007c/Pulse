import { db } from "../db/db.js";

// -------------------------
export function saveLead(lead) {
  db.prepare(`
    INSERT INTO leads (name, website, email, score, status)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    lead.name,
    lead.website || "",
    lead.emails?.[0] || "",
    lead.score,
    lead.status || "new"
  );
}

// -------------------------
export function getLeads() {
  return db.prepare(`SELECT * FROM leads ORDER BY score DESC`).all();
}

// -------------------------
export function updateLeadStatus(name, status) {
  db.prepare(`
    UPDATE leads SET status = ? WHERE name = ?
  `).run(status, name);
}