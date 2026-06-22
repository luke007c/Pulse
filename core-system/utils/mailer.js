import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// -------------------------
// GMAIL SMTP TRANSPORT
// -------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// -------------------------
// SEND EMAIL FUNCTION
// -------------------------
export async function sendEmail({ to, subject, body }) {
  try {
    const result = await transporter.sendMail({
      from: `"Pulse AI" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: body
    });

    return {
      success: true,
      messageId: result.messageId
    };

  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}