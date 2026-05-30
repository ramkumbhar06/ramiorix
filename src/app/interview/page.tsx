// src/app/interview/page.tsx

import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InterviewPageClient from "@/components/interview/InterviewPageClient";

export const metadata: Metadata = {
  title: "Interview Questions",
  description: "Master interview questions for HR, SQL, Data Analyst, US Mortgage, and more.",
};

async function getInterviewData(searchParams: { [key: string]: string | undefined }) {
  const { q, category, difficulty } = searchParams;
  try {
    const [questions, categories] = await Promise.all([
      prisma.interviewQuestion.findMany({
        where: {
          isPublished: true,
          ...(q && {
            OR: [
              { question: { contains: q, mode: "insensitive" } },
              { answer: { contains: q, mode: "insensitive" } },
            ],
          }),
          ...(category && { category: { slug: category } }),
          ...(difficulty && { difficulty }),
        },
        include: { category: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
      prisma.category.findMany({ where: { type: "interview" }, orderBy: { name: "asc" } }),
    ]);
    return { questions, categories };
  } catch {
    return { questions: [], categories: [] };
  }
}

// Next.js 15: searchParams is now a Promise
type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };

export default async function InterviewPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const { questions, categories } = await getInterviewData(resolvedParams);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-neutral-50">
        <InterviewPageClient
          questions={questions}
          categories={categories}
          searchParams={resolvedParams}
        />
      </main>
      <Footer />
    </div>
  );
}
