import { ImageResponse } from "next/og";
import { countries } from "@/data/countries";

export const runtime = "edge";

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 140 }}>{data?.flag ?? "❤️"}</div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            marginTop: 30,
          }}
        >
          The next match
          <br />
          could be found in {data?.name ?? "your country"}.
        </div>

        <div
          style={{
            fontSize: 34,
            color: "#A1A1AA",
            marginTop: 40,
          }}
        >
          OneMatch
        </div>
      </div>
    ),
    size
  );
}