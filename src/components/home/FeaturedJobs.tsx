// src/components/home/FeaturedJobs.tsx
// Featured jobs section on the home page

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types";

type FeaturedJobsProps = {
  jobs: Job[];
};

// Placeholder jobs shown when DB is empty
const placeholderJobs: Partial<Job>[] = [
  {
    id: "1",
    title: "Senior Data Analyst",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹12-18 LPA",
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "SQL Developer",
    company: "FinanceHub",
    location: "Mumbai, Maharashtra",
    type: "Hybrid",
    experience: "1-3 years",
    salary: "₹6-10 LPA",
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "HR Executive",
    company: "StartupX",
    location: "Pune, Maharashtra",
    type: "Full-time",
    experience: "Fresher",
    salary: "₹3-5 LPA",
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "US Mortgage Analyst",
    company: "Global Finance LLC",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "1-3 years",
    salary: "₹8-14 LPA",
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Business Analyst",
    company: "ConsultCo",
    location: "Remote",
    type: "Remote",
    experience: "3-5 years",
    salary: "₹15-22 LPA",
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "Junior Data Analyst",
    company: "AnalyticsFirst",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    experience: "Fresher",
    salary: "₹4-6 LPA",
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 518400000),
    updatedAt: new Date(),
  },
];

export default function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  // Use real jobs from DB, or placeholders if DB is empty
  const displayJobs = jobs.length > 0 ? jobs : (placeholderJobs as Job[]);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">

        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Featured Jobs</h2>
            <p className="section-sub">
              Top opportunities handpicked for you
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
          >
            View all jobs
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayJobs.map((job) => (
            <JobCard key={job.id} job={job} featured={job.isFeatured} />
          ))}
        </div>

        {/* Mobile — View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link href="/jobs" className="btn-ghost flex items-center gap-2">
            View all jobs
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
