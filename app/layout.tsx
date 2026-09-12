import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onematch.world"),
  title: "OneMatch | Find Your Official Bone Marrow Donor Registry",
  description:
    "Find the official bone marrow donor registry for your country.",
  openGraph: {
    title: "OneMatch",
    description: "Find your country's official bone marrow donor registry.",
    url: "https://onematch.world",
    siteName: "OneMatch",
    images: ["/opengraph-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}