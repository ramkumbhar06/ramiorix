// src/app/admin/questions/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminQuestionsTable from "@/components/admin/AdminQuestionsTable";

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
      <p className="font-medium text-neutral-600">
        No questions yet
      </p>

      <Link
        href="/admin/questions/new"
        className="btn-primary text-sm mt-4 inline-flex items-center gap-1.5"
      >
        <Plus size={14} />
        Add your first question
      </Link>
    </div>
  ) : (
    <AdminQuestionsTable
      questions={questions}
    />
  )}

</div>
    </div>
  );
}
