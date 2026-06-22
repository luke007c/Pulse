export function safeParseAI(text, fallback = {}) {
  try {
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON found");
    }

    const jsonString = cleaned.slice(start, end + 1);

    return JSON.parse(jsonString);

  } catch (err) {
    return {
      ...fallback,
      _error: "JSON_PARSE_FAILED",
      _raw: text
    };
  }
}