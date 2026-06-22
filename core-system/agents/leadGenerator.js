export function leadGenerator(businesses = []) {

  const leads = [];

  for (const b of businesses) {

    let score = 0;

    if (b.problems.includes("no website")) score += 3;
    if (b.problems.includes("manual bookings")) score += 3;
    if (b.problems.includes("phone-only bookings")) score += 2;

    if (score < 2) continue;

    leads.push({
      businessName: b.name,
      industry: b.industry,
      problems: b.problems,
      score,
      suggestedProduct:
        score >= 6
          ? "full booking + CRM system"
          : "simple booking website"
    });
  }

  return {
    total: leads.length,
    leads
  };
}