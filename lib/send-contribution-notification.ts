
import "server-only";

import { Resend } from "resend";

type ContributionNotification = {
  type: string;
  country: string | null;
  createdAt: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const typeLabels: Record<string, string> = {
  incorrect_info: "Incorrect country information",
  suggest_registry: "Suggest a donor registry",
  share_experience: "Shared experience",
  other: "Other",
};

export async function sendContributionNotification({
  type,
  country,
  createdAt,
}: ContributionNotification) {
  const recipient = process.env.ADMIN_EMAIL;

  if (!process.env.RESEND_API_KEY || !recipient) {
    throw new Error("Missing email notification configuration.");
  }

  const { data, error } = await resend.emails.send({
    from: "OneMatch <notifications@onematch.world>",
    to: [recipient],
    subject: "New OneMatch Community Contribution",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #18181b;">
        <h2>New community contribution ❤️</h2>

        <p>A new contribution has been submitted to OneMatch.</p>

        <p><strong>Type:</strong> ${typeLabels[type] ?? "Other"}</p>
        <p><strong>Country:</strong> ${country ?? "Not specified"}</p>
        <p><strong>Date:</strong> ${new Date(createdAt).toLocaleString("en-GB", {
          timeZone: "Europe/Lisbon",
        })}</p>

        <p style="margin-top: 30px;">
          <a
            href="https://onematch.world/admin/contributions"
            style="background: #dc2626; color: white; padding: 12px 20px; text-decoration: none; border-radius: 30px;"
          >
            Open Admin Panel
          </a>
        </p>

        <p style="color: #71717a; font-size: 12px;">
          This notification does not contain the contributor's message or contact details.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  return data;
}
