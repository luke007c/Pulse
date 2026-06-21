export async function checkWebsite(url) {
  if (!url) {
    return {
      status: "no_website",
      score: 10,
      notes: ["No website found = high opportunity"]
    };
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 PulseBot"
      }
    });

    const html = await res.text();

    let score = 0;
    const notes = [];

    // BASIC SIGNALS (cheap but effective)

    if (!html || html.length < 3000) {
      score += 3;
      notes.push("Very small/weak website");
    }

    if (!html.includes("booking") && !html.includes("schedule")) {
      score += 3;
      notes.push("No booking system detected");
    }

    if (!html.includes("contact") && !html.includes("email")) {
      score += 2;
      notes.push("Weak contact presence");
    }

    if (!html.includes("http")) {
      score += 2;
      notes.push("Poor structure / outdated HTML");
    }

    return {
      status: "checked",
      score,
      notes
    };

  } catch (err) {
    return {
      status: "error",
      score: 8,
      notes: ["Website unreachable or broken"]
    };
  }
}