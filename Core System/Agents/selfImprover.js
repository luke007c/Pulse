export function selfImprover(memory, project) {

  const insights = [];

  if (!project) {
    insights.push("No project generated — intent detection may be weak");
  }

  if (memory.length < 5) {
    insights.push("Memory context is too small for stable reasoning");
  }

  const recommendations = [
    "Improve business API integration",
    "Add real-time scraping layer",
    "Increase code template diversity",
    "Introduce feedback loop from generated apps"
  ];

  return {
    insights,
    recommendations,
    riskLevel: project ? "low" : "medium"
  };
}