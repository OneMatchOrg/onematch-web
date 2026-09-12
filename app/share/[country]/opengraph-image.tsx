import { ImageResponse } from "next/og";
import { countries } from "@/data/countries";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  const data = countries.find(
    (c) => c.code.toLowerCase() === country.toLowerCase()
  );

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
          textAlign: "center",
          padding: 70,
        }}
      >
        <div
          style={{
            fontSize: 170,
            marginBottom: 20,
          }}
        >
          {data?.flag ?? "❤️"}
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          The next match
          {"\n"}
          could be found in {data?.name ?? "your country"}.
        </div>

        <div
          style={{
            fontSize: 34,
            color: "#D4D4D8",
            marginTop: 35,
          }}
        >
          OneMatch
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#71717A",
            marginTop: 12,
          }}
        >
          One world. One match. One life.
        </div>
      </div>
    ),
    size
  );
}