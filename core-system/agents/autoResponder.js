import { sendEmail } from "../services/emailService.js";

export async function autoReply(lead, classification) {

  if (!lead?.email) return;

  if (classification.category !== "question") return;

  return await sendEmail({
    to: lead.email,
    subject: `Re: Your enquiry`,
    body: `
Hi ${lead.name},

Thanks for your message — happy to help.

We built a demo for your business:

${lead.demoUrl}

Let me know if you'd like a walkthrough.

– Pulse AI
`
  });
}