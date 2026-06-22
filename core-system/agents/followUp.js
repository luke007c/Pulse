import { getLeads } from "../db/storeLeads.js";
import { sendEmail } from "../services/emailService.js";

export async function runFollowUps() {

  const leads = getLeads();

  for (const lead of leads) {

    if (lead.status === "not_interested") continue;

    if (lead.status === "interested") continue;

    if (lead.status === "follow_up_later") {

      await sendEmail({
        to: lead.email,
        subject: `Quick follow-up about your website`,
        body: `
Hi ${lead.name},

Just wanted to follow up on the demo we sent:

${lead.demoUrl}

Still interested in improving your website experience?

– Pulse AI
        `
      });
    }
  }
}