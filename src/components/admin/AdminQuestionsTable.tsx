// src/components/admin/AdminQuestionsTable.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, Pencil } from "lucide-react";
import { difficultyColor, cn } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";

export default function AdminQuestionsTable({
  questions,
}: {
  questions: any[];
}) {
  const [search, setSearch] =
    useState("");

  const filteredQuestions =
    questions.filter(
      (q) =>
        `${q.question || ""} ${
          q.answer || ""
        } ${
          q.category?.name || ""
        } ${
          q.difficulty || ""
        }`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div>

      {/* Search */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-neutral-400
            "
          />

          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              h-11
              pl-10
              pr-10
              rounded-xl
              border
              border-neutral-300
              dark:border-neutral-700
              bg-white
              dark:bg-neutral-900
            "
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-neutral-400
              "
            >
              <X size={16} />
            </button>
          )}

        </div>

      </div>

      {filteredQuestions.length === 0 ? (
        <div className="py-12 text-center text-neutral-500">
          No questions found
        </div>
      ) : (
        <div className="divide-y divide-neutral-50">

          {filteredQuestions.map(
            (q) => (

              <div
                key={q.id}
                className="
                  flex
                  items-start
                  gap-4
                  p-4
                  hover:bg-neutral-50
                  transition-colors
                  group
                "
              >

                <div className="flex-1 min-w-0">

                  <div className="flex flex-wrap gap-2 mb-1">

                    {q.category && (
                      <span className="badge bg-brand-100 text-brand-600 text-xs">
                        {q.category.name}
                      </span>
                    )}

                    <span
                      className={cn(
                        "badge text-xs",
                        difficultyColor(
                          q.difficulty
                        )
                      )}
                    >
                      {q.difficulty}
                    </span>

                    {!q.isPublished && (
                      <span className="badge bg-yellow-100 text-yellow-700 text-xs">
                        Draft
                      </span>
                    )}

                  </div>

                  <p className="text-sm font-medium text-neutral-800 line-clamp-1">
                    {q.question}
                  </p>

                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    {q.answer}
                  </p>

                </div>

                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">

                  <Link
                    href={`/admin/questions/${q.id}/edit`}
                    className="
                      p-1.5
                      rounded-lg
                      text-neutral-400
                      hover:text-brand-500
                      hover:bg-brand-50
                      transition-colors
                    "
                  >
                    <Pencil size={14} />
                  </Link>

                  <DeleteButton
                    id={q.id}
                    type="question"
                  />

                </div>

              </div>

            )
          )}

        </div>
      )}

    </div>
  );
}