// src/app/page.tsx
// The home page — shown at ramiorix.com/
// This is a Server Component (no "use client") — fetches data on the server

import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import LatestBlogs from "@/components/home/LatestBlogs";
import TrendingQuestions from "@/components/home/TrendingQuestions";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import StatsSection from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "Ramiorix — Jobs, Career Guidance & Interview Prep",
  description:
    "Discover job opportunities, prepare for interviews, read career blogs, and get fresher guidance on Ramiorix.",
};

// This fetches data from the database when the page loads
async function getHomeData() {
  try {
    const [
      featuredJobs,
      latestBlogs,
      trendingQuestions,
      categories,
    ] = await Promise.all([
      // Get 6 featured active jobs
      prisma.job.findMany({
        where: { isFeatured: true, isActive: true },
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),

      // Get 3 latest published blogs
      prisma.blog.findMany({
        where: { isPublished: true },
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

      // Get 4 featured questions
      prisma.interviewQuestion.findMany({
        where: { isFeatured: true, isPublished: true },
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),

      // Get job categories
      prisma.category.findMany({
        where: {
          type: "job",
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      featuredJobs,
      latestBlogs,
      trendingQuestions,
      categories,
    };
  } catch {
    // If DB is not set up yet, return empty arrays so the page still renders
    return {
      featuredJobs: [],
      latestBlogs: [],
      trendingQuestions: [],
      categories: [],
    };
  }
}

export default async function HomePage() {
  const {
    featuredJobs,
    latestBlogs,
    trendingQuestions,
    categories,
  } = await getHomeData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />

        <StatsSection />

        <CategoriesSection categories={categories} />

        <FeaturedJobs jobs={featuredJobs} />

        <TrendingQuestions questions={trendingQuestions} />

        <LatestBlogs blogs={latestBlogs} />

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}