// src/app/jobs/page.tsx

import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobsPageClient from "@/components/jobs/JobsPageClient";

export const metadata: Metadata = {
  title: "Browse Jobs",
  description: "Find your next opportunity from thousands of jobs across India and remote positions.",
};

async function getJobs(searchParams: { [key: string]: string | undefined }) {
  const { q, category, location, experience, type } = searchParams;
  try {
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        ...(q && {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { company: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }),
        ...(location && { location: { contains: location, mode: "insensitive" } }),
        ...(experience && { experience: { equals: experience } }),
        ...(type && { type: { equals: type } }),
        ...(category && { category: { slug: { equals: category } } }),
      },
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });

    const categories = await prisma.category.findMany({
      where: { type: "job" },
      orderBy: { name: "asc" },
    });

    return { jobs, categories };
  } catch {
    return { jobs: [], categories: [] };
  }
}

// Next.js 15: searchParams is now a Promise
type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };

export default async function JobsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const { jobs, categories } = await getJobs(resolvedParams);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-neutral-50">
        <JobsPageClient
          initialJobs={jobs}
          categories={categories}
          searchParams={resolvedParams}
        />
      </main>
      <Footer />
    </div>
  );
}
