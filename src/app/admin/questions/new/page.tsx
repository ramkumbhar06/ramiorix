// src/app/admin/questions/new/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuestionForm from "@/components/admin/QuestionForm";

export default async function NewQuestionPage() {
  const categories = await prisma.category.findMany({
    where: { type: "interview" }, orderBy: { name: "asc" },
  }).catch(() => []);

  return (
    <div>
      <Link href="/admin/questions" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to Questions
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-display text-neutral-900">Add Interview Question</h1>
        <p className="text-neutral-500 text-sm">Add a new Q&A for candidates to practice</p>
      </div>
      <QuestionForm categories={categories as any} />
    </div>
  );
}
