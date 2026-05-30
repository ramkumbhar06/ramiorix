// src/app/admin/jobs/new/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JobForm from "@/components/admin/JobForm";

export default async function NewJobPage() {
  const categories = await prisma.category.findMany({
    where: { type: "job" },
    orderBy: { name: "asc" },
  }).catch(() => []);

  return (
    <div>
      <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-display text-neutral-900">Post New Job</h1>
        <p className="text-neutral-500 text-sm mt-0.5">Fill in the details to publish a job listing</p>
      </div>
      <JobForm categories={categories} />
    </div>
  );
}
