// src/app/admin/jobs/page.tsx
// Admin page — lists all jobs with edit/delete options

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate, jobTypeColor, cn } from "@/lib/utils";
import {
  Plus, Pencil, Trash2, MapPin, Eye, EyeOff, Star
} from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-5 py-3 font-medium text-neutral-500 text-xs">Job Title</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Posted</th>
                  <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {job.isFeatured && (
                          <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />
                        )}
                        <span className="font-medium text-neutral-800">{job.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-neutral-600">{job.company}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1 text-neutral-500">
                        <MapPin size={12} />{job.location}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("badge text-xs", jobTypeColor(job.type))}>{job.type}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`badge text-xs ${job.isActive ? "bg-green-100 text-green-600" : "bg-neutral-100 text-neutral-500"}`}>
                        {job.isActive ? (
                          <span className="flex items-center gap-1"><Eye size={10} /> Active</span>
                        ) : (
                          <span className="flex items-center gap-1"><EyeOff size={10} /> Inactive</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-neutral-400 text-xs">{formatDate(job.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/jobs/${job.id}/edit`}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteButton
                          id={job.id}
                          type="job"
                          label="Delete job"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
