"use client";

import { track } from "@vercel/analytics";

type Props = {
  isOpen: boolean;
  countryName: string;
  countryCode: string;
  onClose: () => void;
};

export default function ShareModal({
  isOpen,
  countryName,
  countryCode,
  onClose,
}: Props) {
  if (!isOpen) return null;

  const handleShare = async () => {
    const shareUrl = `https://onematch.world/?country=${countryCode}&utm_source=share&utm_medium=social&utm_campaign=${countryCode.toLowerCase()}`;

    if (navigator.share) {
      track("country_shared", {
        country: countryCode,
        method: "native",
      });

      await navigator.share({
        title: `OneMatch – ${countryName}`,
        text: `Find ${countryName}'s official bone marrow donor registry.`,
        url: shareUrl,
      });
    } else {
      track("country_shared", {
        country: countryCode,
        method: "clipboard",
      });

      await navigator.clipboard.writeText(shareUrl);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mb-4 text-5xl">❤️</div>

          <h2 className="text-2xl font-semibold text-white">
            You're on your way
          </h2>

          <p className="mt-3 text-zinc-300">
            Know someone in <strong>{countryName}</strong>? Help them find the
            right registry too.
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            One share can become another registration.
          </p>
        </div>

        <button
          onClick={handleShare}
          className="mt-8 w-full rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-500 transition"
        >
          Share with someone in {countryName}
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-xl border border-zinc-700 py-3 text-zinc-300 hover:bg-zinc-800 transition"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}