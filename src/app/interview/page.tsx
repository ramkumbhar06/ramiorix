// src/app/interview/page.tsx

import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InterviewPageClient from "@/components/interview/InterviewPageClient";

export const metadata: Metadata = {
  title: "Interview Questions",
  description:
    "Master interview questions for HR, SQL, Data Analyst, US Mortgage, and more.",
};

async function getInterviewData(
  searchParams: {
    [key: string]: string | undefined;
  }
) {

  const {
    q,
    category,
    difficulty,
  } = searchParams;

  try {

    const questions =
      await prisma.interviewQuestion.findMany({
        where: {
          isPublished: true,

          // Search
          ...(q && {
            OR: [

              // Question Search
              {
                question: {
                  contains: q,
                  mode: "insensitive",
                },
              },

              // Answer Search
              {
                answer: {
                  contains: q,
                  mode: "insensitive",
                },
              },

              // Tags / Hashtags Search
              {
                tags: {
                  hasSome: [
                    q,
                    q.replace("#", ""),
                  ],
                },
              },

              // Category Name Search
              {
                category: {
                  name: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              },

              // Category Slug Search
              {
                category: {
                  slug: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              },

            ],
          }),

          // Category Filter
          ...(category && {
            category: {
              slug: category,
            },
          }),

          // Difficulty Filter
          ...(difficulty &&
            difficulty !== "All" && {
              difficulty,
            }),
        },

        include: {
          category: true,
        },

        orderBy: [
          {
            isFeatured: "desc",
          },

          {
            createdAt: "desc",
          },
        ],
      });

    // Categories
    const categories =
      await prisma.category.findMany({
        where: {
          type: "interview",
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return {
      questions,
      categories,
    };

  } catch (error) {

    console.log(error);

    return {
      questions: [],
      categories: [],
    };
  }
}

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
};

export default async function InterviewPage({
  searchParams,
}: PageProps) {

  // Next.js latest version fix
  const resolvedSearchParams =
    await searchParams;

  const data =
    await getInterviewData(
      resolvedSearchParams
    );

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 bg-neutral-50">

        <InterviewPageClient
          questions={data.questions as any}
          categories={data.categories as any}
          searchParams={resolvedSearchParams}
        />

      </main>

      <Footer />

    </div>
  );
}