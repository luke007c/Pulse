export function learningLoop(memory, system, result) {

  const insights = [];

  if (!result?.type) {
    insights.push("System failed to structure output correctly");
  }

  if (memory.length < 10) {
    insights.push("Insufficient memory density for accuracy");
  }

  if (!system?.discovered?.length) {
    insights.push("Business discovery layer underused");
  }

  return {
    insights,
    improvements: [
      "increase retrieval weighting",
      "improve intent classification",
      "strengthen code templates",
      "add real API integrations"
    ],
    confidence: insights.length < 2 ? "high" : "medium"
  };
}