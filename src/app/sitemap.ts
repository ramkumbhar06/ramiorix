// src/app/sitemap.ts
// Generates /sitemap.xml automatically for SEO
// Google uses this to discover and index all your pages

import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ramiorix.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages — always included
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/jobs`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/interview`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/fresher`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic job pages
  let jobPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    const [jobs, blogs] = await Promise.all([
      prisma.job.findMany({ where: { isActive: true }, select: { id: true, updatedAt: true } }),
      prisma.blog.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    ]);

    jobPages = jobs.map((job) => ({
      url: `${BASE_URL}/jobs/${job.id}`,
      lastModified: job.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    blogPages = blogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // If DB not ready, just return static pages
  }

  return [...staticPages, ...jobPages, ...blogPages];
}
