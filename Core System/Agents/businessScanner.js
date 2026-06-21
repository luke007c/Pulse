export function scanBusiness(text) {

  const t = text.toLowerCase();

  const signals = [
    t.includes("no website"),
    t.includes("manual"),
    t.includes("booking"),
    t.includes("outdated"),
    t.includes("slow system"),
    t.includes("missed calls")
  ];

  const score = signals.filter(Boolean).length;

  if (score < 2) {
    return { match: false };
  }

  return {
    match: true,
    score,

    industry: detectIndustry(t),

    problem: signals,

    opportunityLevel:
      score >= 4 ? "high" :
      score === 3 ? "medium" : "low",

    recommendedBuild: {
      type: "web + mobile system",
      features: [
        "booking system",
        "admin dashboard",
        "customer management",
        "notifications"
      ]
    }
  };
}

function detectIndustry(t) {
  if (t.includes("gym")) return "fitness";
  if (t.includes("clinic")) return "healthcare";
  if (t.includes("shop")) return "retail";
  if (t.includes("restaurant")) return "hospitality";
  return "general";
}