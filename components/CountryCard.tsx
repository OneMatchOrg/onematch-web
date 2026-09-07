import Link from "next/link";

type Country = {
  code: string;
  name: string;
  registry: string;
  url: string;
  verified: string;
};

export default function CountryCard({ country }: { country: Country }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-red-500 transition duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-2xl font-bold">{country.name}</h3>
          <p className="text-zinc-400">{country.registry}</p>
        </div>

        <span className="bg-green-900/60 text-green-300 text-xs px-3 py-1 rounded-full">
          Verified {country.verified}
        </span>
      </div>

      {country.code === "PT" ? (
        <Link
          href="/pt"
          className="inline-block mt-6 bg-red-500 hover:bg-red-600 transition rounded-full px-5 py-3 font-semibold"
        >
          Open Portugal →
        </Link>
      ) : (
        <a
          href={country.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-red-500 hover:bg-red-600 transition rounded-full px-5 py-3 font-semibold"
        >
          Official Registry →
        </a>
      )}
    </div>
  );
}