"use client";

// src/components/jobs/JobCard.tsx
// Reusable job card — shown on home page and jobs listing page

import Link from "next/link";
import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react";
import { Job } from "@/types";
import { timeAgo, jobTypeColor, cn } from "@/lib/utils";

type JobCardProps = {
  job: Job;
  featured?: boolean; // Shows a "Featured" badge
};

export default function JobCard({ job, featured = false }: JobCardProps) {
  // Get initials from company name for logo fallback
  const initials = job.company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <article
        className={cn(
          "card p-5 cursor-pointer relative group",
          featured && "border-brand-200 bg-brand-50/30"
        )}
      >
        {/* Featured badge */}
        {featured && (
          <span className="absolute top-3 right-3 badge bg-brand-100 text-brand-600 text-xs">
            Featured
          </span>
        )}

        {/* ── Card Header ── */}
        <div className="flex items-start gap-4 mb-4">
          {/* Company Logo */}
          <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden border border-neutral-200">
            {job.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.logo}
                alt={job.company}
                className="w-full h-full object-contain p-1"
              />
            ) : (
              <span className="text-sm font-semibold text-neutral-500">
                {initials}
              </span>
            )}
          </div>

          {/* Job Title & Company */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-800 text-sm leading-snug group-hover:text-brand-600 transition-colors truncate">
              {job.title}
            </h3>
            <p className="text-neutral-500 text-sm mt-0.5">{job.company}</p>
          </div>
        </div>

        {/* ── Tags Row ── */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Job type (Full-time, Remote, etc.) */}
          <span className={cn("badge text-xs", jobTypeColor(job.type))}>
            {job.type}
          </span>

          {/* Experience level */}
          <span className="badge bg-neutral-100 text-neutral-600 text-xs">
            {job.experience}
          </span>

          {/* Category if available */}
          {job.category && (
            <span className="badge bg-neutral-100 text-neutral-600 text-xs">
              {job.category.name}
            </span>
          )}
        </div>

        {/* ── Details Row ── */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
          {/* Location */}
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {job.location}
          </span>

          {/* Salary (if provided) */}
          {job.salary && (
            <span className="flex items-center gap-1">
              <DollarSign size={12} />
              {job.salary}
            </span>
          )}

          {/* Posted time */}
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {timeAgo(job.createdAt)}
          </span>
        </div>

        {/* Save button — appears on hover */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Don't navigate to job page
            // TODO: implement save job functionality
            alert("Save feature coming soon!");
          }}
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-neutral-100"
          aria-label="Save job"
        >
          <Bookmark size={15} className="text-neutral-400" />
        </button>
      </article>
    </Link>
  );
}
