export function extractJSON(text) {
  try {
    // remove markdown blocks
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // find first { and last }
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    const jsonString = cleaned.slice(start, end + 1);

    return JSON.parse(jsonString);

  } catch (err) {
    return {
      error: "PARSE_FAILED",
      raw: text
    };
  }
}