export function safeParseAI(text, fallback = {}) {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    return {
      ...fallback,
      _error: "JSON_PARSE_FAILED",
      _raw: text
    };
  }
}