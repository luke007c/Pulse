import axios from "axios";
import * as cheerio from "cheerio";

// -------------------------
// FIND WEBSITE FROM NAME (simple heuristic)
// -------------------------
export async function guessWebsite(name) {
  try {
    const query = encodeURIComponent(name + " Portsmouth gym official website");

    // fallback search pattern (no API needed)
    const url = `https://www.google.com/search?q=${query}`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(res.data);

    const link = $("a")
      .map((i, el) => $(el).attr("href"))
      .get()
      .find(h => h && h.includes("http") && !h.includes("google"));

    return link || null;

  } catch {
    return null;
  }
}

// -------------------------
// EXTRACT EMAIL FROM WEBSITE
// -------------------------
export async function extractEmail(website) {
  try {
    if (!website) return null;

    const res = await axios.get(website, {
      timeout: 5000
    });

    const emails = res.data.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    );

    if (!emails || emails.length === 0) return null;

    // remove junk emails
    const filtered = emails.filter(e =>
      !e.includes("example") &&
      !e.includes("test") &&
      !e.includes("domain")
    );

    return filtered[0] || null;

  } catch {
    return null;
  }
}