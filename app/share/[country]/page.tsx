import { notFound } from "next/navigation";
import { countries } from "@/data/countries";

export function generateStaticParams() {
  return countries.map((country) => ({
    country: country.code.toLowerCase(),
  }));
}

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;

  const data = countries.find(
    (c) => c.code.toLowerCase() === country.toLowerCase()
  );

  if (!data) {
    return {
      title: "OneMatch",
    };
  }

  return {
    title: `The next match could be found in ${data.name}`,
    description: `Could that match be found in ${data.name}? Join the official registry.`,
    openGraph: {
      title: `The next match could be found in ${data.name}`,
      description: `Could that match be found in ${data.name}?`,
      images: ["https://onematch.world/share-preview.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `The next match could be found in ${data.name}`,
      description: `Could that match be found in ${data.name}?`,
      images: ["https://onematch.world/share-preview.png"],
    },
  };
}

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default async function SharePage({ params }: Props) {
  const { country } = await params;

  const data = countries.find(
    (c) => c.code.toLowerCase() === country.toLowerCase()
  );

  if (!data) notFound();

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">

        {/* Logo */}
        <div className="mb-8">
          <img
            src="/logo-v1.png"
            alt="OneMatch"
            className="mx-auto w-64 md:w-72 h-auto"
          />

          <h2 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-white">
            OneMatch
          </h2>
        </div>

        {/* Flag */}
        <div className="text-5xl md:text-6xl leading-none mb-8">
          {data.flag}
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
          The next match
          <br />
          could be found in {data.name}.
        </h1>

        {/* Supporting copy */}
        <p className="mt-7 text-base md:text-lg text-zinc-300 leading-relaxed">
          Someone is waiting for a compatible bone marrow donor.
        </p>

        <p className="mt-4 text-lg md:text-xl text-white leading-relaxed">
          Could that match be found in {data.name}?
        </p>

        {/* Trust text */}
        <p className="mt-6 text-sm text-zinc-400">
          Official registry · Takes just a few minutes
        </p>

        {/* CTA */}
        <a
          href={data.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full rounded-2xl bg-red-600 py-4 text-lg font-semibold text-white hover:bg-red-500 transition-all duration-300"
        >
          Join the official registry in {data.name} ↗
        </a>

        {/* Footer */}
        <p className="mt-12 text-sm text-zinc-500">
          One world. One match. One life.
        </p>

      </div>
    </main>
  );
}