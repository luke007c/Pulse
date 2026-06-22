import { google } from "googleapis";

const auth = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

auth.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({ version: "v1", auth });

export async function getRecentEmails() {

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
    q: "is:unread"
  });

  const messages = res.data.messages || [];

  const fullEmails = [];

  for (const msg of messages) {
    const email = await gmail.users.messages.get({
      userId: "me",
      id: msg.id
    });

    fullEmails.push(email.data);
  }

  return fullEmails;
}