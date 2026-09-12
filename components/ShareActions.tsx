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

    // Red glow behind the logo
    const glow = ctx.createRadialGradient(540, 170, 60, 540, 170, 340);
    glow.addColorStop(0, "rgba(220,38,38,0.35)");
    glow.addColorStop(1, "rgba(220,38,38,0)");

    ctx.fillStyle = glow;
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

    ctx.drawImage(
      logo,
      (1080 - logoWidth) / 2,
      80,
      logoWidth,
      logoHeight
    );

    ctx.textAlign = "center";

// 🇵🇹 Flag emoji (realmente centrado)
ctx.font = "180px sans-serif";
ctx.fillStyle = "#FFFFFF";
ctx.textAlign = "left";
ctx.textBaseline = "middle";

const flagWidth = ctx.measureText(flag).width;
ctx.fillText(flag, 540 - flagWidth / 2, 520);

    // MAIN MESSAGE
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 82px Arial";
    ctx.fillText("Someone is waiting", 540, 700);
    ctx.fillText("for a compatible", 540, 800);
    ctx.fillText("bone marrow donor.", 540, 900);

    // Secondary message
    ctx.fillStyle = "#A1A1AA";
    ctx.font = "40px Arial";
    ctx.fillText("The next match could be found", 540, 1050);
    ctx.fillText(`in ${countryName}.`, 540, 1110);

    // CTA
    ctx.fillStyle = "#DC2626";
    roundRect(ctx, 190, 1260, 700, 92, 26);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 42px Arial";
    ctx.fillText("Help us find them.", 540, 1318);

    // Link
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 42px Arial";
    ctx.fillText(
      `onematch.world/share/${countryCode.toLowerCase()}`,
      540,
      1700
    );

    // Trust
    ctx.fillStyle = "#71717A";
    ctx.font = "28px Arial";
    ctx.fillText("Official registry • OneMatch", 540, 1755);

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

  const handleShare = async () => {
    track("country_shared", {
      country: countryCode,
      method: "native",
    });

    await navigator.share?.({
      title: "OneMatch",
      text: "Someone is waiting for a compatible bone marrow donor.",
      url: shareUrl,
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);

    track("country_shared", {
      country: countryCode,
      method: "clipboard",
    });
  };

  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      {/* Instagram */}
      <button
        onClick={handleInstagramStory}
        className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/20 via-red-500/10 to-orange-500/20 p-4 transition hover:border-pink-500 hover:scale-[1.02]"
      >
        <div className="text-3xl">📸</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Instagram Story
        </div>
      </button>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center transition hover:border-green-500 hover:bg-green-500/20 hover:scale-[1.02]"
      >
        <div className="text-3xl">💬</div>
        <div className="mt-2 text-sm font-semibold text-white">
          WhatsApp
        </div>
      </a>

      {/* Native Share */}
      <button
        onClick={handleShare}
        className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 transition hover:border-blue-500 hover:bg-blue-500/20 hover:scale-[1.02]"
      >
        <div className="text-3xl">📨</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Share
        </div>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="rounded-2xl border border-zinc-600 bg-zinc-800 p-4 transition hover:bg-zinc-700 hover:scale-[1.02]"
      >
        <div className="text-3xl">🔗</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Copy Link
        </div>
      </button>
    </div>
  );
}