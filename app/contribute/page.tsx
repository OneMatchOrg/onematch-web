
"use client";

import { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Turnstile,
  type TurnstileInstance,
} from "@marsidev/react-turnstile";
import { countries } from "@/data/countries";

const translations = {
  en: {
    back: "← Back to OneMatch",
    title: "Help improve OneMatch.",
    intro:
      "Found incorrect information? Know a donor registry we're missing? Your contribution can help someone find the right registry.",
    typesLabel: "What would you like to do?",
    types: [
      "Report incorrect country information",
      "Suggest a donor registry",
      "Share an experience",
      "Other suggestion",
    ],
    country: "Country (optional)",
    selectCountry: "Select a country",
    message: "Your message",
    placeholder:
      "Tell us what needs correcting or what we should add...",
    source: "Source link (optional)",
    email: "Email address (optional)",
    emailPlaceholder: "you@example.com",
    emailNote:
      "Only provide your email if you'd like us to contact you about your contribution.",
    security: "Security verification failed. Please try again.",
    minLength: "Please provide at least 10 characters.",
    verification: "Please complete the security verification.",
    submitError: "Could not submit contribution.",
    generalError:
      "We couldn't submit your contribution. Please try again.",
    submitting: "Submitting...",
    submit: "Submit contribution →",
    review:
      "Every contribution is reviewed before any changes are made to OneMatch.",
    thanks: "Thank you for helping OneMatch!",
    received:
      "Your contribution has been received and will be reviewed by our team.",
    another: "Send another contribution",
  },
  pt: {
    back: "← Voltar ao OneMatch",
    title: "Ajuda a melhorar o OneMatch.",
    intro:
      "Encontraste informação incorreta? Conheces um registo de dadores que nos esteja a faltar? O teu contributo pode ajudar alguém a encontrar o registo certo.",
    typesLabel: "O que gostarias de fazer?",
    types: [
      "Comunicar informação incorreta sobre um país",
      "Sugerir um registo de dadores",
      "Partilhar uma experiência",
      "Outra sugestão",
    ],
    country: "País (opcional)",
    selectCountry: "Seleciona um país",
    message: "A tua mensagem",
    placeholder:
      "Diz-nos o que precisa de ser corrigido ou o que devemos acrescentar...",
    source: "Ligação da fonte (opcional)",
    email: "Endereço de email (opcional)",
    emailPlaceholder: "tu@exemplo.com",
    emailNote:
      "Indica o teu email apenas se quiseres que entremos em contacto contigo sobre o teu contributo.",
    security: "A verificação de segurança falhou. Tenta novamente.",
    minLength: "Escreve pelo menos 10 caracteres.",
    verification: "Conclui a verificação de segurança.",
    submitError: "Não foi possível enviar o contributo.",
    generalError:
      "Não foi possível enviar o teu contributo. Tenta novamente.",
    submitting: "A enviar...",
    submit: "Enviar contributo →",
    review:
      "Todos os contributos são analisados antes de qualquer alteração ao OneMatch.",
    thanks: "Obrigado por ajudares o OneMatch!",
    received:
      "Recebemos o teu contributo. A nossa equipa irá analisá-lo.",
    another: "Enviar outro contributo",
  },
};

function ContributeForm() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "pt" ? "pt" : "en";
  const t = translations[lang];

  const contributionTypes = [
    "incorrect_info",
    "suggest_registry",
    "share_experience",
    "other",
  ];

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (website) return;

    if (message.trim().length < 10) {
      setError(t.minLength);
      return;
    }

    if (!turnstileToken) {
      setError(t.verification);
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
        throw new Error(result.error || t.submitError);
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
      setError(t.generalError);
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
          href={lang === "pt" ? "/pt" : "/"}
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition mb-8"
        >
          {t.back}
        </Link>

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">❤️</div>
          <h1 className="text-4xl md:text-5xl font-bold">
            {t.title}
          </h1>
          <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
            {t.intro}
          </p>
        </div>

        {success ? (
          <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <div className="text-4xl mb-4">💚</div>
            <h2 className="text-2xl font-semibold">
              {t.thanks}
            </h2>
            <p className="mt-3 text-zinc-300">
              {t.received}
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-full bg-red-600 px-6 py-3 font-medium hover:bg-red-500 transition"
            >
              {t.another}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                {t.typesLabel}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
              >
                {contributionTypes.map((value, index) => (
                  <option key={value} value={value}>
                    {t.types[index]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.country}
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
              >
                <option value="">{t.selectCountry}</option>
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
                {t.message}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                minLength={10}
                maxLength={5000}
                rows={6}
                placeholder={t.placeholder}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-red-500 outline-none resize-y"
              />
              <p className="mt-1 text-xs text-zinc-500 text-right">
                {message.length}/5000
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.source}
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
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-red-500 outline-none"
              />
              <p className="mt-2 text-xs text-zinc-500">
                {t.emailNote}
              </p>
            </div>

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
                  setError(t.security);
                }}
                options={{ theme: "dark", size: "flexible" }}
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
              {loading ? t.submitting : t.submit}
            </button>

            <p className="text-center text-xs text-zinc-500">
              {t.review}
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

export default function ContributePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
          <p className="text-zinc-400">Loading...</p>
        </main>
      }
    >
      <ContributeForm />
    </Suspense>
  );
}
