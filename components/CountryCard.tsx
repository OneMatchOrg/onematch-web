
type Country = {
  code: string;
  name: string;
  organization: string;
  url: string;
  verified: string;
};

export default function CountryCard({ country }: { country: Country }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-red-500 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white">{country.name}</h3>
          <p className="text-zinc-400">{country.organization}</p>
        </div>

        <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">
          {country.verified}
        </span>
      </div>

      <a
        href={country.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full font-medium"
      >
        Official Registry →
      </a>
    </div>
  );
}