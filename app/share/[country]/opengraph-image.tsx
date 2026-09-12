import { ImageResponse } from "next/og";
import { countries } from "@/data/countries";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  const data = countries.find(
    (c) => c.code.toLowerCase() === country.toLowerCase()
  );

  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#09090B",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 60,
          }}
        >
          OneMatch
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 70,
          textAlign: "center",
        }}
      >
        <img
          src="https://onematch.world/logo-v1.png"
          width={220}
          height={220}
          alt="OneMatch"
        />

        <div style={{ fontSize: 90, marginTop: 30 }}>
          {data.flag}
        </div>

        <div
          style={{
            fontSize: 62,
            fontWeight: 700,
            marginTop: 25,
            lineHeight: 1.15,
          }}
        >
          The next match
          <br />
          could be found in {data.name}.
        </div>

        <div
          style={{
            fontSize: 30,
            color: "#D4D4D8",
            marginTop: 35,
          }}
        >
          One world. One match. One life.
        </div>
      </div>
    ),
    size
  );
}