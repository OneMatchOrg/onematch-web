"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    const query = search.trim().toLowerCase();

    if (!query) return;

    const match = countries.find(
      (country) => country.name.toLowerCase() === query
    );

    if (!match) return;

    if (match.landingPage) {
      router.push(match.landingPage);
    } else {
      window.open(match.registrationUrl, "_blank");
    }
  };

  return (
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
    ❤️ 25 Verified Registries
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

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-14 pb-6">
          Heartbeat v0.1 • Founder #001 — Tiago Reis Leitão
        </p>
      </div>
    </main>
  );
}