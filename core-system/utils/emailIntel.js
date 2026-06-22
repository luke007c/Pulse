const COMMON_PATTERNS = [
  "info@",
  "contact@",
  "hello@",
  "admin@",
  "support@",
  "bookings@"
];

// -------------------------
// GENERATE LIKELY EMAILS FROM DOMAIN
// -------------------------
export function guessEmails(domain) {

  if (!domain) return [];

  const clean = domain.replace("https://", "").replace("http://", "").replace("www.", "");

  const emails = COMMON_PATTERNS.map(p => `${p}${clean}`);

  return [...new Set(emails)];
}

// -------------------------
// BASIC VALIDATION (SAFE, NO API NEEDED)
// -------------------------
export function isValidEmail(email) {

  if (!email) return false;

  if (!email.includes("@")) return false;

  if (email.includes("..")) return false;

  if (email.includes(" ")) return false;

  return true;
}