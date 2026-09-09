import { MetadataRoute } from "next";
import { countries } from "@/data/countries";

const BASE_URL = "https://onematch.world";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  countries
    .filter((country) => country.landingPage)
    .forEach((country) => {
      pages.push({
        url: `${BASE_URL}${country.landingPage}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    });

  return pages;
}