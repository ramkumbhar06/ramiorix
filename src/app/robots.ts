// src/app/robots.ts
// Generates /robots.txt — tells search engines what to index

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ramiorix.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Block admin pages from being indexed
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
