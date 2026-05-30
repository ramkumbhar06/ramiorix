// src/components/home/TrendingQuestions.tsx
// Shows trending interview questions on the home page

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { InterviewQuestion } from "@/types";
import { difficultyColor, cn } from "@/lib/utils";

type Props = { questions: InterviewQuestion[] };

// Placeholder data when DB is empty
const placeholderQuestions: Partial<InterviewQuestion>[] = [
  {
    id: "1",
    question: "Tell me about yourself. How should a fresher answer this?",
    answer: "Start with your educational background, then mention your skills and projects. Emphasize your enthusiasm and willingness to learn. Keep it under 2 minutes and tailor it to the job role.",
    difficulty: "Easy",
    tags: ["hr", "fresher", "introduction"],
    category: { id: "1", name: "HR Interview", slug: "hr", type: "interview", createdAt: new Date() },
  },
  {
    id: "2",
    question: "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
    answer: "INNER JOIN returns only rows that have matching values in both tables. LEFT JOIN returns all rows from the left table and matching rows from the right table — non-matching right rows are NULL.",
    difficulty: "Medium",
    tags: ["sql", "joins", "database"],
    category: { id: "2", name: "SQL", slug: "sql", type: "interview", createdAt: new Date() },
  },
  {
    id: "3",
    question: "What are the key metrics a Data Analyst should track for an e-commerce business?",
    answer: "Key metrics include: Conversion Rate, Average Order Value (AOV), Customer Acquisition Cost (CAC), Customer Lifetime Value (CLV), Cart Abandonment Rate, and Monthly Revenue Growth.",
    difficulty: "Medium",
    tags: ["data analyst", "metrics", "ecommerce"],
    category: { id: "3", name: "Data Analyst", slug: "data-analyst", type: "interview", createdAt: new Date() },
  },
  {
    id: "4",
    question: "What is Loan-to-Value ratio (LTV) in US Mortgage?",
    answer: "LTV is the ratio of the loan amount to the appraised value of the property. For example, if a home is worth $200,000 and the loan is $160,000, the LTV is 80%. Higher LTV = higher risk for lenders.",
    difficulty: "Easy",
    tags: ["mortgage", "ltv", "finance"],
    category: { id: "4", name: "US Mortgage", slug: "us-mortgage", type: "interview", createdAt: new Date() },
  },
];

export default function TrendingQuestions({ questions }: Props) {
  const displayQuestions = questions.length > 0 ? questions : (placeholderQuestions as InterviewQuestion[]);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">

        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Trending Interview Questions</h2>
            <p className="section-sub">
              Most asked questions across industries
            </p>
          </div>
          <Link
            href="/interview"
            className="hidden md:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
          >
            See all questions
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {displayQuestions.map((q) => (
            <QuestionAccordion key={q.id} question={q} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <Link href="/interview" className="btn-primary flex items-center gap-2">
            Explore All Interview Questions
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}

// Simple accordion for each question — shows answer when clicked
function QuestionAccordion({ question }: { question: InterviewQuestion }) {
  return (
    <details className="card p-0 group overflow-hidden">
      <summary className="flex items-start gap-4 p-5 cursor-pointer list-none">
        {/* Category & Difficulty Badges */}
        <div className="flex gap-2 mt-0.5 shrink-0">
          {question.category && (
            <span className="badge bg-brand-100 text-brand-600 text-xs whitespace-nowrap">
              {question.category.name}
            </span>
          )}
          <span className={cn("badge text-xs", difficultyColor(question.difficulty))}>
            {question.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <span className="flex-1 font-medium text-neutral-800 text-sm leading-snug">
          {question.question}
        </span>

        {/* Expand arrow */}
        <ChevronDown
          size={16}
          className="text-neutral-400 shrink-0 mt-0.5 transition-transform group-open:rotate-180"
        />
      </summary>

      {/* Answer (shown when expanded) */}
      <div className="px-5 pb-5 border-t border-neutral-100 pt-4">
        <p className="text-sm text-neutral-600 leading-relaxed">
          {question.answer}
        </p>
        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {question.tags.map((tag) => (
              <span key={tag} className="badge bg-neutral-100 text-neutral-500 text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Link to full question page */}
        <Link
          href={`/interview/${question.id}`}
          className="inline-flex items-center gap-1 text-brand-500 text-xs font-medium mt-3 hover:text-brand-600"
        >
          View full answer & related questions
          <ArrowRight size={12} />
        </Link>
      </div>
    </details>
  );
}
