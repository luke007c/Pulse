export function scoreLead(business) {

  let score = 0;

  // small businesses = better
  score += 30;

  // no digital maturity = higher chance
  if (business.why_they_are_good_lead?.toLowerCase().includes("outdated")) {
    score += 25;
  }

  // reply likelihood from AI
  score += (business.likely_to_reply_score || 50) * 0.4;

  // gyms/PT studios = strong intent
  if (business.type?.toLowerCase().includes("gym")) score += 15;

  return Math.min(Math.round(score), 100);
}