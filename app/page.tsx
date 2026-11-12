
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CountryCard from "@/components/CountryCard";
import ShareModal from "@/components/ShareModal";
import { countries } from "@/data/countries";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const languageMap: Record<string, string> = {
  "pt-pt": "PT",
  "pt-br": "BR",
  pt: "PT",
  es: "ES",
  fr: "FR",
  de: "DE",
  it: "IT",
  nl: "NL",
  ja: "JP",
  sv: "SE",
  fi: "FI",
  da: "DK",
};

export default function Home() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareCountry, setShareCountry] = useState({
    code: "",
    name: "",
  });

  const [search, setSearch] = useState("");
  const [suggestedCode, setSuggestedCode] = useState<string | null>(null);

  const router = useRouter();

  // Suggests a country based on browser language
  useEffect(() => {
    const timer = setTimeout(() => {
      const lang = navigator.language.toLowerCase();
      const short = lang.split("-")[0];

      setSuggestedCode(languageMap[lang] || languageMap[short] || null);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Shows Welcome Back when the user returns
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleFocus = () => {
      const code = sessionStorage.getItem("last-country");
      const name = sessionStorage.getItem("last-country-name");

      if (!code || !name) return;

      const completed =
        sessionStorage.getItem(`completed-${code}`) === "true";

      const welcomed =
        sessionStorage.getItem(`welcomed-${code}`) === "true";

      if (completed && !welcomed) {
        setShareCountry({ code, name });

        timer = setTimeout(() => {
          setShareModalOpen(true);
        }, 200);

        sessionStorage.setItem(`welcomed-${code}`, "true");
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const query = normalize(search.trim());

  const filtered = [...countries]
    .filter((country) => {
      const terms = country.searchTerms.map(normalize);
      return query === "" || terms.some((term) => term.includes(query));
    })
    .sort((a, b) => {
      if (a.code === suggestedCode) return -1;
      if (b.code === suggestedCode) return 1;
      return a.name.localeCompare(b.name);
    });

  const handleSearch = () => {
    if (!query) return;

    const match = countries.find((country) =>
      country.searchTerms.map(normalize).includes(query)
    );

    if (!match) return;

    if (match.landingPage) {
      router.push(match.landingPage);
    } else {
      window.open(match.registrationUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#09090B] text-white px-6 py-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8 pt-1">
            <div className="flex justify-center -mb-1">
              <img
                src="/logo-v1.png"
                alt="OneMatch Logo"
                className="w-72 md:w-[300px] h-auto object-contain drop-shadow-[0_0_18px_rgba(255,30,60,0.15)]"
              />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              OneMatch
            </h1>

            <p className="mt-2 text-zinc-300 text-lg md:text-xl font-light">
              Find your official bone marrow donor registry.
            </p>

            <p className="mt-2 text-red-500 text-base font-medium">
              One world. One match. One life.
            </p>

            <div className="mt-6 flex justify-center">
              <span className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                ❤️ {countries.length} Verified Countries
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search your country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-full px-7 py-4 text-lg text-white placeholder:text-zinc-500 focus:border-red-500 outline-none transition duration-300"
            />
          </div>

          {/* Countries */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>

          {/* Community Contributions */}
          <section className="mt-16 mb-10">
            <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/40 p-8 md:p-12 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative max-w-2xl mx-auto">
                <div className="text-4xl mb-5">❤️</div>

                <p className="text-red-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                  Community powered
                </p>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Help improve OneMatch
                </h2>

                <p className="mt-5 text-zinc-300 text-base md:text-lg leading-relaxed">
                  Know something we should update? Found a better source?
                  Share your knowledge and help us keep OneMatch accurate,
                  up to date and useful for everyone.
                </p>

                <a
                  href="/contribute"
                  className="inline-flex items-center justify-center gap-2 mt-8 rounded-full bg-red-600 hover:bg-red-500 px-8 py-4 text-white font-semibold transition duration-300 shadow-lg shadow-red-950/30"
                >
                  Help us improve
                  <span aria-hidden="true">→</span>
                </a>

                <p className="mt-5 text-sm text-zinc-500">
                  Every contribution makes a difference.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <p className="text-center text-zinc-500 text-sm mt-8 pb-6">
            Heartbeat v0.1 • Founder #001 — Tiago Reis Leitão
          </p>
        </div>
      </main>

      <ShareModal
        isOpen={shareModalOpen}
        countryCode={shareCountry.code}
        countryName={shareCountry.name}
        onClose={() => setShareModalOpen(false)}
      />
    </>
  );
}
