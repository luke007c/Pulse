export async function judge(content) {

  let score = 5;

  const feedback = [];

  const text = typeof content === "string"
    ? content
    : JSON.stringify(content);

  const lower = text.toLowerCase();

  // =========================
  // LENGTH QUALITY SIGNALS
  // =========================
  if (text.length > 500) {
    score += 2;
    feedback.push("High detail output");
  }

  if (text.length < 80) {
    score -= 3;
    feedback.push("Too short / low information");
  }

  // =========================
  // STRUCTURE DETECTION
  // =========================
  if (
    lower.includes("step 1") ||
    lower.includes("1.") ||
    lower.includes("json") ||
    lower.includes("{")
  ) {
    score += 2;
    feedback.push("Structured output detected");
  }

  // =========================
  // ACTIONABILITY CHECK
  // =========================
  if (
    lower.includes("build") ||
    lower.includes("generate") ||
    lower.includes("create") ||
    lower.includes("api") ||
    lower.includes("deploy")
  ) {
    score += 2;
    feedback.push("Action-oriented response");
  }

  // =========================
  // BUSINESS VALUE SIGNAL
  // =========================
  if (
    lower.includes("business") ||
    lower.includes("lead") ||
    lower.includes("customer") ||
    lower.includes("revenue") ||
    lower.includes("sell")
  ) {
    score += 2;
    feedback.push("Business-relevant content");
  }

  // =========================
  // LOW QUALITY DETECTION
  // =========================
  if (
    lower.includes("i'm not sure") ||
    lower.includes("i don't know") ||
    lower.includes("as an ai")
  ) {
    score -= 2;
    feedback.push("Low confidence / generic AI response");
  }

  // =========================
  // NORMALISE SCORE
  // =========================
  if (score > 10) score = 10;
  if (score < 0) score = 0;

  // =========================
  // FINAL CLASSIFICATION
  // =========================
  let grade;

  if (score >= 8) grade = "excellent";
  else if (score >= 6) grade = "good";
  else if (score >= 4) grade = "average";
  else grade = "poor";

  return {
    score,
    grade,
    feedback
  };
}