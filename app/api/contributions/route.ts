
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendContributionNotification } from "@/lib/send-contribution-notification";

export const runtime = "nodejs";

const allowedTypes = [
  "incorrect_info",
  "suggest_registry",
  "share_experience",
  "other",
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

async function verifyTurnstile(
  token: string,
  expectedHostname: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || !token || token.length > 2048) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret,
          response: token,
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      return false;
    }

    const result = await response.json();

    return (
      result.success === true &&
      result.hostname === expectedHostname
    );
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > 20000) {
      return NextResponse.json(
        { error: "Submission is too large." },
        { status: 413 }
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    // Honeypot: silently ignore automated submissions.
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const {
      type,
      country,
      message,
      source_url,
      contact_email,
      turnstileToken,
    } = body;

    if (
      typeof type !== "string" ||
      !allowedTypes.includes(type) ||
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.trim().length > 5000
    ) {
      return NextResponse.json(
        { error: "Invalid contribution data." },
        { status: 400 }
      );
    }

    if (
      country !== null &&
      country !== undefined &&
      typeof country !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid country." },
        { status: 400 }
      );
    }

    if (
      source_url !== null &&
      source_url !== undefined &&
      source_url !== ""
    ) {
      if (
        typeof source_url !== "string" ||
        source_url.length > 2048
      ) {
        return NextResponse.json(
          { error: "Invalid source URL." },
          { status: 400 }
        );
      }

      try {
        const parsedUrl = new URL(source_url);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid source URL." },
          { status: 400 }
        );
      }
    }

    if (
      contact_email !== null &&
      contact_email !== undefined &&
      contact_email !== ""
    ) {
      if (
        typeof contact_email !== "string" ||
        contact_email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)
      ) {
        return NextResponse.json(
          { error: "Invalid contact email." },
          { status: 400 }
        );
      }
    }

    // Verify the Turnstile token before saving anything.
    const hostname = new URL(request.url).hostname;

    const turnstileValid = await verifyTurnstile(
      turnstileToken,
      hostname
    );

    if (!turnstileValid) {
      return NextResponse.json(
        {
          error:
            "Security verification expired or failed. Please try again.",
        },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from("contributions")
      .insert({
        type,
        country: country || null,
        message: message.trim(),
        source_url: source_url || null,
        contact_email: contact_email || null,
        status: "new",
      });

    if (error) {
      console.error("Contribution database error:", error);

      return NextResponse.json(
        { error: "Could not save your contribution." },
        { status: 500 }
      );
    }

    // Email failure must not cause duplicate submissions.
    try {
      await sendContributionNotification({
        type,
        country: country || null,
        createdAt: new Date().toISOString(),
      });
    } catch (emailError) {
      console.error(
        "Contribution notification failed:",
        emailError
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contribution submission error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
