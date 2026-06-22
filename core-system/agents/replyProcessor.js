import { getRecentEmails } from "../services/gmailInbox.js";
import { classifyReply } from "./replyAgent.js";
import { matchReplyToLead, attachReplyToLead } from "./replyMatcher.js";
import { decideNextAction } from "./replyActions.js";

export async function processReplies() {

  const emails = await getRecentEmails();

  for (const email of emails) {

    const text = JSON.stringify(email);
    const classification = await classifyReply(text);
    const lead = matchReplyToLead(text);

    attachReplyToLead(lead, classification, text);

    const action = decideNextAction(classification.category);

    console.log("📩 Reply Action:", {
      lead: lead?.name,
      category: classification.category,
      action
    });
  }
}