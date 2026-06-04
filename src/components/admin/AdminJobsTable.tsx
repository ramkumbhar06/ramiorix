// src/components/admin/AdminJobsTable.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate, jobTypeColor, cn } from "@/lib/utils";
import {
  Pencil, MapPin, Eye, EyeOff, Star, X, Search,
} from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";


export default function AdminJobsTable({
  jobs,
}: {
  jobs: any[];
}) {
    const [search, setSearch] =
  useState("");

const filteredJobs = jobs.filter(
  (job) =>
    `${job.title || ""} ${job.company || ""} ${job.location || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
);
  return (
    <div>
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
      placeholder="Search jobs..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
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
{filteredJobs.length === 0 ? (
  <div className="py-12 text-center text-neutral-500">
    No jobs found
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
               {filteredJobs.map((job) => ( 
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
    
  );
}