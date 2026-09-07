import Link from "next/link";
import { Country } from "@/data/countries";

type Props = {
  country: Country;
};

const registrationInfo = {
  questionnaire: {
    icon: "📝",
    label: "Questionnaire",
  },
  kit: {
    icon: "🧬",
    label: "Free kit",
  },
  "blood-donation": {
    icon: "🩸",
    label: "Blood donation",
  },
  "pre-registration": {
    icon: "✅",
    label: "Pre-registration",
  },
};

export default function CountryCard({ country }: Props) {
  const info = registrationInfo[country.registrationType];

  const href = country.landingPage ?? country.registrationUrl;

  return (
    <Link
      href={href}
      target={country.landingPage ? "_self" : "_blank"}
      rel={country.landingPage ? undefined : "noopener noreferrer"}
      className="group block rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 hover:border-red-500 transition-all duration-300 p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-3xl mb-3">{country.flag}</div>

          <h3 className="text-xl font-semibold group-hover:text-red-400 transition-colors">
            {country.name}
          </h3>

          <p className="text-zinc-400 text-sm mt-1">{country.registry}</p>
        </div>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200">
        <span>{info.icon}</span>
        <span>{info.label}</span>
        <span className="text-zinc-500">·</span>
        <span>{country.estimatedTime}</span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-red-400 font-medium">
          Start registration
        </span>

        <span className="text-zinc-500 group-hover:text-red-400 transition-colors text-xl">
          →
        </span>
      </div>
    </Link>
  );
}