import { researcher } from "./researcher/index.js";
import { sendOutreach } from "./sales/sendOutreach.js";

export async function runCampaign(query) {

  const leads = await researcher(query);

  for (const business of leads.businesses) {
    await sendOutreach(business);
  }

  console.log("Campaign complete");
}