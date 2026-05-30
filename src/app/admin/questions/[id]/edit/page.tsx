import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuestionForm from "@/components/admin/QuestionForm";
import type { InterviewQuestion, Category } from "@prisma/client";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditQuestionPage({ params }: PageProps) {
  const { id } = await params;
  let question: (InterviewQuestion & { category: Category | null }) | null = null;
  let categories: Category[] = [];
  try {
    [question, categories] = await Promise.all([
      prisma.interviewQuestion.findUnique({ where: { id }, include: { category: true } }),
      prisma.category.findMany({ where: { type: "interview" }, orderBy: { name: "asc" } }),
    ]);
  } catch {}
  if (!question) notFound();
  return (
    <div>
      <Link href="/admin/questions" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to Questions
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-display text-neutral-900">Edit Question</h1>
      </div>
      <QuestionForm question={question as any} categories={categories as any} />
    </div>
  );
}
