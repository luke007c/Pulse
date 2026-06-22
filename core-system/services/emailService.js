import nodemailer from "nodemailer";
import { canSend } from "./rateLimiter.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendEmail({ to, subject, body }) {

  if (!canSend(to)) {
    return {
      success: false,
      skipped: true,
      reason: "rate_limited"
    };
  }

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text: body
  });

  return {
    success: true,
    messageId: info.messageId
  };
}