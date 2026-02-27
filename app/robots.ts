import type { MetadataRoute } from "next";

const BASE_URL = "https://tabletopreboxing.shop";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/success"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
