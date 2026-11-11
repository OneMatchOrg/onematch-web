
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { countries } from "@/data/countries";

const contributionTypes = [
  {
    value: "incorrect_info",
    label: "Report incorrect country information",
  },
  {
    value: "suggest_registry",
    label: "Suggest a donor registry",
  },
  {
    value: "share_experience",
    label: "Share an experience",
  },
  {
    value: "other",
    label: "Other suggestion",
  },
] as const;

export default function ContributePage() {
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [type, setType] = useState("incorrect_info");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (website) return;

    if (message.trim().length < 10) {
      setError("Please provide at least 10 characters.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the security verification.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contributions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          country: country || null,
          message: message.trim(),
          source_url: sourceUrl.trim() || null,
          contact_email: email.trim() || null,
          website,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Could not submit contribution."
        );
      }

      setSuccess(true);
      setType("incorrect_info");
      setCountry("");
      setMessage("");
      setSourceUrl("");
      setEmail("");
      setWebsite("");
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } catch (err) {
      console.error("Contribution submission failed:", err);
      setError(
        "We couldn't submit your contribution. Please try again."
      );
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition mb-8"
        >
          ← Back to OneMatch
        </Link>

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">❤️</div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Help improve OneMatch.
          </h1>
          <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
            Found incorrect information? Know a donor registry
            we&apos;re missing? Your contribution can help someone
            find the right registry.
          </p>
        </div>

        {success ? (
          <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <div className="text-4xl mb-4">💚</div>
            <h2 className="text-2xl font-semibold">
              Thank you for helping OneMatch!
            </h2>
            <p className="mt-3 text-zinc-300">
              Your contribution has been received and will be
              reviewed by our team.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-full bg-red-600 px-6 py-3 font-medium hover:bg-red-500 transition"
            >
              Send another contribution
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                What would you like to do?
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
              >
                {contributionTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Country (optional)
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
              >
                <option value="">Select a country</option>
                {countries
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                minLength={10}
                maxLength={5000}
                rows={6}
                placeholder="Tell us what needs correcting or what we should add..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-red-500 outline-none resize-y"
              />
              <p className="mt-1 text-xs text-zinc-500 text-right">
                {message.length}/5000
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Source link (optional)
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://official-registry.org"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email address (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-red-500 outline-none"
              />
              <p className="mt-2 text-xs text-zinc-500">
                Only provide your email if you&apos;d like us to contact you
                about your contribution.
              </p>
            </div>

            {/* Honeypot anti-spam field */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px]"
            >
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            <div className="flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={
                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""
                }
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
                onError={() => {
                  setTurnstileToken("");
                  setError("Security verification failed. Please try again.");
                }}
                options={{
                  theme: "dark",
                  size: "flexible",
                }}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !turnstileToken}
              className="w-full rounded-full bg-red-600 py-4 text-lg font-semibold text-white hover:bg-red-500 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit contribution →"}
            </button>

            <p className="text-center text-xs text-zinc-500">
              Every contribution is reviewed before any changes
              are made to OneMatch.
            </p>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-zinc-500">
          One world. One match. One life.
        </p>
      </div>
    </main>
  );
}
