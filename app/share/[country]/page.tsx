import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { countries } from "@/data/countries";
import ShareActions from "@/components/ShareActions";

export function generateStaticParams() {
  return countries.map((country) => ({
    country: country.code.toLowerCase(),
  }));
}

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
    return { title: "OneMatch" };
  }

  return {
    title: `The next match could be found in ${data.name}`,
    description: "Someone is waiting for a compatible bone marrow donor.",
    openGraph: {
      title: `The next match could be found in ${data.name}`,
      description: "Someone is waiting for a compatible bone marrow donor.",
      images: ["https://onematch.world/share-preview.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `The next match could be found in ${data.name}`,
      description: "Someone is waiting for a compatible bone marrow donor.",
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
    <main className="min-h-screen bg-[#09090B] text-white px-6 py-10">
      <div className="mx-auto max-w-md">

        {/* Hero */}
        <div className="text-center">
          <img
            src="/logo-v1.png"
            alt="OneMatch"
            className="mx-auto w-64 md:w-72 h-auto"
          />

          <p className="mt-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
            One world. One match. One life.
          </p>

          <div className="mt-8 text-6xl leading-none">
            {data.flag}
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight">
            The next match
            <br />
            could be found
            <br />
            in {data.name}.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-zinc-300">
            Someone is waiting for a compatible bone marrow donor.
          </p>
        </div>

        {/* Share Hub */}
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
          <h2 className="text-center text-2xl font-semibold">
            Help us find the next match.
          </h2>

          <p className="mt-3 text-center text-zinc-400 leading-relaxed">
            The right donor could be anywhere.
            <br />
            Your share could help the right person discover the official registry.
          </p>

          <ShareActions
            countryName={data.name}
            countryCode={data.code}
            flag={data.flag}
          />

          <p className="mt-6 text-center text-sm leading-relaxed text-zinc-400">
            <span className="font-medium text-white">
              Share first. Register next.
            </span>
            <br />
            Every action helps.
          </p>
        </div>

        {/* Register */}
        <div className="mt-10 rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-500/15 to-red-900/20 p-6 text-center">

          <div className="text-4xl">❤️</div>

          <h3 className="mt-3 text-2xl font-semibold">
            Join {data.name}'s official registry
          </h3>

          <p className="mt-3 leading-relaxed text-zinc-300">
            It only takes a few minutes to become part of the official registry.
          </p>

          <a
            href={data.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full rounded-2xl bg-red-600 py-4 text-lg font-semibold text-white transition hover:bg-red-500"
          >
            Join {data.name}'s official registry ↗
          </a>
        </div>

        {/* Trust */}
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur space-y-5">

          <div className="flex items-start gap-3">
            <span className="text-xl">🌍</span>
            <p className="text-sm text-zinc-300">
              OneMatch only points to official registries.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">❤️</span>
            <p className="text-sm text-zinc-300">
              One person can become someone's only compatible donor.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">🔗</span>
            <p className="text-sm text-zinc-300">
              Every share helps another person discover the official registry.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center">

          <h4 className="text-2xl font-semibold">
            Become the next link.
          </h4>

          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
            One world. One match. One life.
          </p>

        </div>

      </div>
    </main>
  );
}