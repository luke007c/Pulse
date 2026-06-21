export function outreachEngine(leads) {

  const messages = [];

  for (const lead of leads.leads || []) {

    const message = {
      business: lead.businessName,
      score: lead.score,
      emailDraft: `
Hi ${lead.businessName},

I noticed your business may be missing a modern booking/management system.

We build simple systems that:
- reduce missed bookings
- automate customer scheduling
- improve customer experience

Based on your setup, you could benefit from:
${lead.suggestedProduct}

If you'd like, I can show you a quick demo tailored to your business.

Best regards
Pulse AI System
      `.trim()
    };

    messages.push(message);
  }

  return {
    total: messages.length,
    messages
  };
}