
"use client";

import { useState } from "react";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#09090B] text-white px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">

          <div className="w-24 h-24 mx-auto rounded-full border-4 border-red-500 flex items-center justify-center animate-pulse mb-6">
            <span className="text-red-500 text-4xl">♥</span>
          </div>

          <h1 className="text-6xl font-bold">OneMatch</h1>

          <p className="mt-4 text-zinc-300 text-xl">
            Find your official bone marrow donor registry.
          </p>

          <p className="text-red-400 mt-2">
            One world. One match. One life.
          </p>

        </div>

        <input
          type="text"
          placeholder="Search your country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-full px-6 py-4 text-white focus:border-red-500 outline-none"
        />

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          {filtered.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}

        </div>

        <p className="text-center text-zinc-500 text-sm mt-16">
          Heartbeat v0.1 • Founder #001 — Tiago Reis Leitão
        </p>

      </div>

    </main>
  );
}