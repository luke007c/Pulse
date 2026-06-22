export async function checkWebsite(url) {

  if (!url) {
    return {
      status: "no_website",
      score: 10,
      notes: ["No website found"]
    };
  }

  try {
    const res = await fetch(url);
    const html = await res.text();

    let score = 0;
    const notes = [];

    if (!html || html.length < 3000) {
      score += 3;
      notes.push("Weak website");
    }

    if (!html.includes("booking")) {
      score += 3;
      notes.push("No booking system");
    }

    if (!html.includes("contact")) {
      score += 2;
      notes.push("Weak contact flow");
    }

    return {
      status: "checked",
      score,
      notes
    };

  } catch {
    return {
      status: "error",
      score: 8,
      notes: ["Site unreachable"]
    };
  }
}