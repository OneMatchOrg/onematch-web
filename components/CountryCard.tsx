import Link from "next/link";
import { Country } from "@/data/countries";

export default function CountryCard({ country }: { country: Country }) {
  const badgeColor =
    country.status === "verified"
      ? "bg-green-900/60 text-green-300"
      : country.status === "review"
      ? "bg-yellow-900/60 text-yellow-300"
      : "bg-zinc-800 text-zinc-300";

  const buttonText = country.directRegistration
    ? "Start Registration →"
    : "Official Registry →";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-red-500 transition duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-2xl font-bold">
            {country.flag} {country.name}
          </h3>

          <p className="text-zinc-400">{country.registry}</p>
        </div>

        <span className={`${badgeColor} text-xs px-3 py-1 rounded-full`}>
          Verified {country.verified}
        </span>
      </div>

      {country.landingPage ? (
        <Link
          href={country.landingPage}
          className="inline-block mt-6 bg-red-500 hover:bg-red-600 transition rounded-full px-5 py-3 font-semibold"
        >
          {buttonText}
        </Link>
      ) : (
        <a
          href={country.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-red-500 hover:bg-red-600 transition rounded-full px-5 py-3 font-semibold"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}