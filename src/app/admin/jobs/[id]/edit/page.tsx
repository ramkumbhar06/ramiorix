import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JobForm from "@/components/admin/JobForm";
import type { Job, Category } from "@prisma/client";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params;
  let job: (Job & { category: Category | null }) | null = null;
  let categories: Category[] = [];
  try {
    [job, categories] = await Promise.all([
      prisma.job.findUnique({ where: { id }, include: { category: true } }),
      prisma.category.findMany({ where: { type: "job" }, orderBy: { name: "asc" } }),
    ]);
  } catch {}
  if (!job) notFound();
  return (
    <div>
      <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-display text-neutral-900">Edit Job</h1>
        <p className="text-neutral-500 text-sm">{job.title} at {job.company}</p>
      </div>
      <JobForm job={job as any} categories={categories as any} />
    </div>
  );
}
