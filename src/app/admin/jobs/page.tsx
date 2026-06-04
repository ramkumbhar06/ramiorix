// src/app/admin/jobs/page.tsx
// Admin page — lists all jobs with edit/delete options

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate, jobTypeColor, cn } from "@/lib/utils";
import {
  Plus, Pencil, Trash2, MapPin, Eye, EyeOff, Star
} from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import AdminJobsTable from "@/components/admin/AdminJobsTable";

async function getJobs() {
  try {
    return await prisma.job.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminJobsPage() {
  const jobs = await getJobs();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-neutral-900">Jobs</h1>
          <p className="text-neutral-500 text-sm">{jobs.length} total jobs</p>
        </div>
        <Link href="/admin/jobs/new" className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} />
          Post New Job
        </Link>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {jobs.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <div className="text-4xl mb-3">💼</div>
            <p className="font-medium text-neutral-600">No jobs posted yet</p>
            <Link href="/admin/jobs/new" className="btn-primary text-sm mt-4 inline-flex items-center gap-1.5">
              <Plus size={14} /> Post your first job
            </Link>
          </div>
        ) : (
          <AdminJobsTable jobs={jobs} />
        )}
      </div>
    </div>
  );
}
