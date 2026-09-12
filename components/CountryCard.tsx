"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Country } from "@/data/countries";

type Props = {
  country: Country;
};

const registrationTypeInfo = {
  questionnaire: {
    icon: "📝",
    label: "Health questionnaire",
  },
  kit: {
    icon: "📦",
    label: "Free home kit",
  },
  "blood-donation": {
    icon: "🩸",
    label: "Register during blood donation",
  },
  "pre-registration": {
    icon: "➡️",
    label: "Official pre-registration",
  },
  online: {
    icon: "💻",
    label: "Online registration",
  },
  "donor-centre": {
    icon: "🏥",
    label: "Visit a donor centre",
  },
} as const;

export default function CountryCard({ country }: Props) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const completedInSession =
      sessionStorage.getItem(`completed-${country.code}`) === "true";

    if (completedInSession) {
      setCompleted(true);
    }
  }, [country.code]);

  const info = registrationTypeInfo[country.registrationType];

  const handleCardClick = (e: React.MouseEvent) => {
    if (completed) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      track("official_registry_opened", {
        country: country.code,
        registrationType: country.registrationType,
        source: params.get("utm_source") ?? "direct",
        campaign: params.get("utm_campaign") ?? "none",
        medium: params.get("utm_medium") ?? "none",
      });

      sessionStorage.setItem("last-country", country.code);
      sessionStorage.setItem("last-country-name", country.name);
      sessionStorage.setItem(`completed-${country.code}`, "true");

      setCompleted(true);
      setLoading(false);

      const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

      const openRegistry = () => {
        if (isIOS) {
          window.location.href = country.registrationUrl;
        } else {
          window.open(
            country.registrationUrl,
            "_blank",
            "noopener,noreferrer"
          );
        }
      };

      if (country.landingPage && country.code === "PT") {
        openRegistry();
      } else if (country.landingPage) {
        router.push(country.landingPage);
      } else {
        openRegistry();
      }
    }, 450);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (country.landingPage) {
      router.push(country.landingPage);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = `https://onematch.world/share/${country.code.toLowerCase()}`;

    if (navigator.share) {
      track("country_shared", {
        country: country.code,
        method: "native",
      });

      await navigator.share({
        title: `OneMatch – ${country.name}`,
        text: "Someone is waiting for a compatible bone marrow donor.",
        url: shareUrl,
      });
    } else {
      track("country_shared", {
        country: country.code,
        method: "clipboard",
      });

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Link
      href={country.registrationUrl}
      onClick={handleCardClick}
      className="group relative block rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 hover:border-red-500 transition-all duration-300 p-6 overflow-hidden"
    >
      {loading && (
        <div className="absolute inset-0 bg-[#09090B]/95 backdrop-blur flex flex-col items-center justify-center z-20">
          <div className="animate-pulse text-3xl mb-3">❤️</div>
          <p className="text-white font-medium text-center">
            Taking you to the official registry...
          </p>
        </div>
      )}

      {country.landingPage && (
        <button
          onClick={handleInfoClick}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-400 hover:text-white hover:border-red-500 hover:bg-zinc-800 transition flex items-center justify-center"
          aria-label={`More information about ${country.name}`}
        >
          ⓘ
        </button>
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className="text-3xl mb-3">{country.flag}</div>

          <h3 className="text-xl font-semibold group-hover:text-red-400 transition-colors">
            {country.name}
          </h3>

          <p className="text-zinc-400 text-sm mt-1">{country.registry}</p>
        </div>
      </div>

      <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200">
        <span>{info.icon}</span>
        <span>{info.label}</span>

        {country.eligibleAge && (
          <>
            <span className="text-zinc-500">·</span>
            <span>🎂 {country.eligibleAge}</span>
          </>
        )}

        <span className="text-zinc-500">·</span>
        <span>{country.estimatedTime}</span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        {completed ? (
          <button
            onClick={handleShare}
            className="text-red-400 font-medium hover:text-red-300 transition-colors"
          >
            <span className="hidden sm:inline">
              ↗ Share with someone in {country.name}
            </span>
            <span className="sm:hidden">↗ Share {country.name}</span>
          </button>
        ) : (
          <span className="text-red-400 font-medium">
            Start registration
          </span>
        )}

        <span className="text-zinc-500 group-hover:text-red-400 transition-colors text-xl">
          →
        </span>
      </div>

      {copied && (
        <p className="mt-3 text-xs text-green-400">
          Link copied.
        </p>
      )}
    </Link>
  );
}