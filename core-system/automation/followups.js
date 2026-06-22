import cron from "node-cron";
import { getActiveCampaigns, advanceCampaign } from "../utils/campaigns.js";

// -------------------------
// RUN EVERY 1 MINUTE
// -------------------------
cron.schedule("* * * * *", async () => {

  const campaigns = getActiveCampaigns();

  for (const c of campaigns) {

    if (c.step === 0) {
      console.log("Send EMAIL 1 to:", c.lead_name);
      advanceCampaign(c.lead_name);
    }

    else if (c.step === 1) {
      console.log("Send FOLLOW-UP EMAIL 2:", c.lead_name);
      advanceCampaign(c.lead_name);
    }

    else if (c.step === 2) {
      console.log("Final follow-up:", c.lead_name);
      advanceCampaign(c.lead_name);
    }
  }
});