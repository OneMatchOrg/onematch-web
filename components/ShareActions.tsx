"use client";

import { track } from "@vercel/analytics";

type Props = {
  countryName: string;
  countryCode: string;
  flag: string;
};

export default function ShareActions({
  countryName,
  countryCode,
  flag,
}: Props) {
  const shareUrl = `https://onematch.world/share/${countryCode.toLowerCase()}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Someone is waiting for a compatible bone marrow donor.\n\nThe next match could be found in ${countryName}.\n\n${shareUrl}`
  )}`;

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

  const handleInstagramStory = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#09090B";
    ctx.fillRect(0, 0, 1080, 1920);

    // Soft red glow
    const gradient = ctx.createRadialGradient(540, 220, 40, 540, 220, 300);
    gradient.addColorStop(0, "rgba(220,38,38,0.35)");
    gradient.addColorStop(1, "rgba(220,38,38,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 500);

    // Logo
    const logo = new Image();
    logo.src = "/logo-v1.png";

    await new Promise<void>((resolve, reject) => {
      logo.onload = () => resolve();
      logo.onerror = () => reject();
    });

    const logoWidth = 340;
    const logoHeight = (logo.height / logo.width) * logoWidth;

    ctx.drawImage(logo, (1080 - logoWidth) / 2, 120, logoWidth, logoHeight);

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";

    ctx.font = "700 74px Arial";
    ctx.fillText("OneMatch", 540, 390);

    ctx.font = "180px Arial";
    ctx.fillText(flag, 540, 620);

    ctx.font = "700 68px Arial";
    ctx.fillText("The next match", 540, 840);
    ctx.fillText("could be found", 540, 920);
    ctx.fillText(`in ${countryName}.`, 540, 1000);

    ctx.fillStyle = "#D4D4D8";
    ctx.font = "42px Arial";
    ctx.fillText("Someone is waiting for a compatible", 540, 1180);
    ctx.fillText("bone marrow donor.", 540, 1240);

    ctx.fillStyle = "#DC2626";
    roundRect(ctx, 180, 1440, 720, 92, 24);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 40px Arial";
    ctx.fillText("Could that match be found here?", 540, 1498);

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
      await navigator.share({
        title: "OneMatch",
        text: "Someone is waiting for a compatible bone marrow donor.",
        url: shareUrl,
      });
    }
  };

  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      <button
        onClick={handleInstagramStory}
        className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/20 via-red-500/10 to-orange-500/20 p-4 hover:border-pink-500 transition hover:scale-[1.02]"
      >
        <div className="text-3xl">📸</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Instagram Story
        </div>
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center hover:border-green-500 transition hover:scale-[1.02]"
      >
        <div className="text-3xl">💬</div>
        <div className="mt-2 text-sm font-semibold text-white">
          WhatsApp
        </div>
      </a>

      <button
        onClick={() =>
          navigator.share?.({
            title: "OneMatch",
            text: `The next match could be found in ${countryName}.`,
            url: shareUrl,
          })
        }
        className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 hover:border-blue-500 transition hover:scale-[1.02]"
      >
        <div className="text-3xl">📨</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Share
        </div>
      </button>

      <button
        onClick={() => navigator.clipboard.writeText(shareUrl)}
        className="rounded-2xl border border-zinc-600 bg-zinc-800 p-4 hover:bg-zinc-700 transition hover:scale-[1.02]"
      >
        <div className="text-3xl">🔗</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Copy Link
        </div>
      </button>
    </div>
  );
}