"use client";

import { track } from "@vercel/analytics";
import { countries } from "@/data/countries";

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

  const countryFlag =
    countries.find((c) => c.code === countryCode)?.flag ?? "❤️";

  const shareUrl = `https://onematch.world/share/${countryCode.toLowerCase()}`;

  const handleShare = async () => {
    if (navigator.share) {
      track("country_shared", {
        country: countryCode,
        method: "native",
      });

      await navigator.share({
        title: `OneMatch – ${countryName}`,
        text: "Someone is waiting for a compatible bone marrow donor.",
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

  const handleInstagramStory = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fundo
    ctx.fillStyle = "#09090B";
    ctx.fillRect(0, 0, 1080, 1920);

    // Logo verdadeiro
    const logo = new Image();
    logo.src = "/logo-v1.png";

    await new Promise<void>((resolve, reject) => {
      logo.onload = () => resolve();
      logo.onerror = () => reject(new Error("Logo failed to load"));
    });

    const logoWidth = 320;
    const logoHeight = (logo.height / logo.width) * logoWidth;

    ctx.drawImage(
      logo,
      (1080 - logoWidth) / 2,
      120,
      logoWidth,
      logoHeight
    );

    // OneMatch
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.font = "700 72px Arial";
    ctx.fillText("OneMatch", 540, 390);

    // Bandeira
    ctx.font = "170px Arial";
    ctx.fillText(countryFlag, 540, 620);

    // Headline
    ctx.font = "700 68px Arial";
    ctx.fillText("The next match", 540, 840);
    ctx.fillText("could be found", 540, 920);
    ctx.fillText(`in ${countryName}.`, 540, 1000);

    // Texto secundário
    ctx.fillStyle = "#D4D4D8";
    ctx.font = "42px Arial";
    ctx.fillText("Someone is waiting for a compatible", 540, 1180);
    ctx.fillText("bone marrow donor.", 540, 1240);

    // CTA visual
    ctx.fillStyle = "#DC2626";
    roundRect(ctx, 180, 1440, 720, 92, 24);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 40px Arial";
    ctx.fillText("Could that match be found here?", 540, 1498);

    // Footer
    ctx.fillStyle = "#71717A";
    ctx.font = "34px Arial";
    ctx.fillText("onematch.world", 540, 1760);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    if (!blob) return;

    const file = new File([blob], `OneMatch-${countryCode}.png`, {
      type: "image/png",
    });

    track("country_shared", {
      country: countryCode,
      method: "instagram_story",
    });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "OneMatch",
        text: "Someone is waiting for a compatible bone marrow donor.",
      });
    } else {
      await handleShare();
      return;
    }

    onClose();
  };

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

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
          onClick={handleInstagramStory}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 py-3 font-semibold text-white hover:opacity-90 transition"
        >
          📸 Share to Instagram Story
        </button>

        <button
          onClick={handleShare}
          className="mt-3 w-full rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-500 transition"
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