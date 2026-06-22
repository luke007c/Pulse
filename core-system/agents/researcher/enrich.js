import { guessEmails } from "../../utils/emailIntel.js";

// -------------------------
// ENRICH BUSINESS DATA
// -------------------------
export async function enrichBusiness(business) {
  try {

    if (!business?.website) {
      return {
        ...business,
        emails: [],
        siteQualityScore: 10,
        hasContactPage: false,
        hasBooking: false,
        hasPricing: false
      };
    }

    const res = await fetch(business.website, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await res.text();

    const domain = extractDomain(business.website);

    return {
      ...business,

      // -------------------------
      // BASIC WEBSITE SIGNALS
      // -------------------------
      title: extractTitle(html),
      hasContactPage: html.includes("contact"),
      hasBooking: html.includes("book") || html.includes("schedule"),
      hasPricing: html.includes("pricing") || html.includes("price"),

      // -------------------------
      // EMAIL INTELLIGENCE (DOMAIN BASED)
      // -------------------------
      emails: guessEmails(domain),

      // -------------------------
      // QUALITY SCORING SIGNAL
      // -------------------------
      siteQualityScore: scoreWebsite(html)

    };

  } catch (err) {
    return {
      ...business,
      emails: [],
      siteQualityScore: 20,
      error: "fetch_failed"
    };
  }
}

// -------------------------
// EXTRACT DOMAIN
// -------------------------
function extractDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "unknown.com";
  }
}

// -------------------------
// EXTRACT TITLE
// -------------------------
function extractTitle(html) {
  const match = html.match(/<title>(.*?)<\/title>/i);
  return match ? match[1].slice(0, 80) : "No title";
}

// -------------------------
// WEBSITE QUALITY SCORE
// -------------------------
function scoreWebsite(html) {
  let score = 50;

  if (html.includes("contact")) score += 10;
  if (html.includes("services")) score += 10;
  if (html.includes("book")) score += 10;
  if (html.includes("pricing")) score += 10;

  if (html.length < 3000) score -= 10;
  if (html.includes("wordpress")) score += 5;

  return Math.max(0, Math.min(100, score));
}