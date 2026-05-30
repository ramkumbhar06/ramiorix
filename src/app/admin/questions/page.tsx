// src/app/admin/questions/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { difficultyColor, cn } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminQuestionsPage() {
  const questions = await prisma.interviewQuestion.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-neutral-900">Interview Questions</h1>
          <p className="text-neutral-500 text-sm">{questions.length} questions</p>
        </div>
        <Link href="/admin/questions/new" className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} /> Add Question
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {questions.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <div className="text-4xl mb-3">❓</div>
            <p className="font-medium text-neutral-600">No questions yet</p>
            <Link href="/admin/questions/new" className="btn-primary text-sm mt-4 inline-flex items-center gap-1.5">
              <Plus size={14} /> Add your first question
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-50">
            {questions.map((q) => (
              <div key={q.id} className="flex items-start gap-4 p-4 hover:bg-neutral-50 transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-1">
                    {q.category && (
                      <span className="badge bg-brand-100 text-brand-600 text-xs">{q.category.name}</span>
                    )}
                    <span className={cn("badge text-xs", difficultyColor(q.difficulty))}>
                      {q.difficulty}
                    </span>
                    {!q.isPublished && (
                      <span className="badge bg-yellow-100 text-yellow-700 text-xs">Draft</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-neutral-800 line-clamp-1">{q.question}</p>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{q.answer}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/questions/${q.id}/edit`} className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors">
                    <Pencil size={14} />
                  </Link>
                  <DeleteButton id={q.id} type="question" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
