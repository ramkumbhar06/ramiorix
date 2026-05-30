"use client";

// src/components/interview/InterviewPageClient.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { InterviewQuestion, Category } from "@/types";
import { difficultyColor, cn } from "@/lib/utils";

// Interview categories shown as quick filter buttons
const INTERVIEW_CATEGORIES = [
  { label: "All", slug: "" },
  { label: "HR Interview", slug: "hr" },
  { label: "SQL", slug: "sql" },
  { label: "Data Analyst", slug: "data-analyst" },
  { label: "US Mortgage", slug: "us-mortgage" },
  { label: "Technical", slug: "technical" },
  { label: "Freshers", slug: "freshers" },
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

type Props = {
  questions: InterviewQuestion[];
  categories: Category[];
  searchParams: { [key: string]: string | undefined };
};

export default function InterviewPageClient({ questions, categories, searchParams }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.q || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.category || "");
  const [activeDifficulty, setActiveDifficulty] = useState(searchParams.difficulty || "");

  function applyFilters(updates: Record<string, string> = {}) {
    const params = new URLSearchParams();
    const newSearch = updates.q ?? search;
    const newCategory = updates.category ?? activeCategory;
    const newDifficulty = updates.difficulty ?? activeDifficulty;
    if (newSearch) params.set("q", newSearch);
    if (newCategory) params.set("category", newCategory);
    if (newDifficulty) params.set("difficulty", newDifficulty);
    router.push(`/interview?${params.toString()}`);
  }

  return (
    <div className="container-custom py-10">

      {/* Page Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-display text-neutral-900 mb-3">
          Interview Questions
        </h1>
        <p className="text-neutral-500">
          {questions.length}+ questions across HR, SQL, Data Analysis, and more.
          Practice answers and ace your next interview.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {INTERVIEW_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => {
              setActiveCategory(cat.slug);
              applyFilters({ category: cat.slug });
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-all",
              activeCategory === cat.slug
                ? "bg-brand-500 text-white border-brand-500"
                : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search + Difficulty */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
        <div className="flex-1 bg-white rounded-xl border border-neutral-200 flex items-center gap-2 px-3 shadow-sm">
          <Search size={16} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="flex-1 py-2.5 text-sm focus:outline-none placeholder:text-neutral-400"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => {
                const next = activeDifficulty === d ? "" : d;
                setActiveDifficulty(next);
                applyFilters({ difficulty: next });
              }}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                activeDifficulty === d
                  ? "bg-brand-500 text-white border-brand-500"
                  : difficultyColor(d) + " border-transparent"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="max-w-3xl mx-auto space-y-3">
          {questions.map((q, i) => (
            <QuestionCard key={q.id} question={q} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// Individual question card with expand/collapse
function QuestionCard({ question, index }: { question: InterviewQuestion; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      {/* Question Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        {/* Question Number */}
        <span className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-500 text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
          {index}
        </span>

        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {question.category && (
              <span className="badge bg-brand-100 text-brand-600 text-xs">
                {question.category.name}
              </span>
            )}
            <span className={cn("badge text-xs", difficultyColor(question.difficulty))}>
              {question.difficulty}
            </span>
          </div>

          <p className="font-medium text-neutral-800 text-sm leading-snug">
            {question.question}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={cn(
            "text-neutral-400 shrink-0 mt-1 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-neutral-100">
          <div className="pt-4">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">
              Answer
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap">
              {question.answer}
            </p>

            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-neutral-100">
                {question.tags.map((tag) => (
                  <span key={tag} className="badge bg-neutral-100 text-neutral-500 text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 text-neutral-400">
      <div className="text-4xl mb-3">🤔</div>
      <p className="font-medium text-neutral-600">No questions found</p>
      <p className="text-sm mt-1">Try a different category or search term</p>
    </div>
  );
}
