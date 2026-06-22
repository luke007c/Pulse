export function scoreLead(lead) {
  let score = 50; // base score

  if (!lead?.name) score -= 50;

  const text = (lead.name + " " + (lead.type || "")).toLowerCase();

  // small local business boost
  if (text.includes("gym") || text.includes("fitness")) score += 20;

  // penalty for chains (safety layer)
  const chains = ["puregym", "david lloyd", "nuffield", "anytime fitness"];
  if (chains.some(c => text.includes(c))) score -= 100;

  // opportunity strength
  if (lead.opportunity?.toLowerCase().includes("website")) score += 15;

  return Math.max(0, Math.min(100, score));
}