import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

metadataBase: new URL("https://onematch.world")

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onematch.world"),

  title: {
    default: "OneMatch | One world. One match. One life.",
    template: "%s | OneMatch",
  },

  description:
    "Find the shortest verified path to your country's official donor registry.",

  applicationName: "OneMatch",

  openGraph: {
    type: "website",
    url: "https://onematch.world",
    title: "OneMatch | One world. One match. One life.",
    description:
      "Find the shortest verified path to your country's official donor registry.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OneMatch",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "OneMatch | One world. One match. One life.",
    description:
      "Find the shortest verified path to your country's official donor registry.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
