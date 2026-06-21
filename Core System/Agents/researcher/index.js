import { askAI } from "../../llm.js";
import { safeParseAI } from "../../utils/safeParse.js";
import { searchGyms } from "../../services/search.js";
import { checkWebsite } from "../../services/websiteChecker.js";
import { saveLeads } from "../../db/storeLeads.js";

export async function researcher(input) {

  const results = await searchGyms(input);

  const prompt = `
You are a lead analysis engine.

Only use REAL search results.

DATA:
${JSON.stringify(results, null, 2)}

Extract gyms and return:

{
  "businesses": [
    {
      "name": "",
      "url": "",
      "type": "",
      "websiteNeeds": "",
      "appNeeds": "",
      "salesScore": 1
    }
  ]
}
`;

  const response = await askAI(prompt);
  const data = safeParseAI(response, { businesses: [] });

  let leads = [];

  for (const b of (data.businesses || [])) {

    const siteCheck = await checkWebsite(b.url);

    const finalScore =
      (b.salesScore || 0) +
      (siteCheck.score || 0);

    leads.push({
      ...b,
      websiteHealth: siteCheck,
      salesScore: finalScore
    });
  }

  // filter strong leads only
  leads = leads
    .filter(l => l.salesScore >= 8)
    .sort((a, b) => b.salesScore - a.salesScore);

  saveLeads(leads);

  return {
    businesses: leads,
    source: "pulse_v3_with_website_check"
  };
}