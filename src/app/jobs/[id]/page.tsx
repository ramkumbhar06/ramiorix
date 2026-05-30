// src/app/jobs/[id]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate, jobTypeColor, cn } from "@/lib/utils";
import { MapPin, Clock, DollarSign, Briefcase, ExternalLink, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

type PageProps = { params: Promise<{ id: string }> };

async function getJob(id: string) {
  try {
    return await prisma.job.findUnique({ where: { id }, include: { category: true } });
  } catch { return null; }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return { title: "Job Not Found" };
  return { title: `${job.title} at ${job.company}`, description: job.description.slice(0, 160) };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const initials = job.company.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-neutral-50 py-10">
        <div className="container-custom">
          <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Jobs
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    {job.logo ? (
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span className="font-bold text-neutral-500 text-lg">{initials}</span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-display font-medium text-neutral-900 mb-1">{job.title}</h1>
                    <p className="text-neutral-600 font-medium">{job.company}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className={cn("badge", jobTypeColor(job.type))}>{job.type}</span>
                  <span className="badge bg-neutral-100 text-neutral-600">{job.experience}</span>
                  {job.category && <span className="badge bg-brand-100 text-brand-600">{job.category.name}</span>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-neutral-600"><MapPin size={15} className="text-neutral-400" />{job.location}</div>
                  {job.salary && <div className="flex items-center gap-2 text-sm text-neutral-600"><DollarSign size={15} className="text-neutral-400" />{job.salary}</div>}
                  <div className="flex items-center gap-2 text-sm text-neutral-600"><Briefcase size={15} className="text-neutral-400" />{job.experience}</div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600"><Clock size={15} className="text-neutral-400" />{formatDate(job.createdAt)}</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <h2 className="font-semibold text-neutral-800 mb-4">Job Description</h2>
                <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap">{job.description}</div>
              </div>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <h2 className="font-semibold text-neutral-800 mb-4">Requirements</h2>
                <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap">{job.requirements}</div>
              </div>
              {job.benefits && (
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                  <h2 className="font-semibold text-neutral-800 mb-4">Benefits</h2>
                  <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap">{job.benefits}</div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm sticky top-20">
                <h3 className="font-semibold text-neutral-800 mb-1">Ready to Apply?</h3>
                <p className="text-sm text-neutral-500 mb-4">Don&apos;t wait — great jobs fill quickly.</p>
                {job.applyUrl ? (
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center gap-2">
                    Apply Now <ExternalLink size={14} />
                  </a>
                ) : (
                  <button className="btn-primary w-full">Apply Now</button>
                )}
                <div className="mt-4 pt-4 border-t border-neutral-100 text-xs text-neutral-400 space-y-1">
                  <div className="flex items-center gap-2"><Building2 size={12} />{job.company}</div>
                  <div className="flex items-center gap-2"><MapPin size={12} />{job.location}</div>
                  <div className="flex items-center gap-2"><Clock size={12} />Posted {formatDate(job.createdAt)}</div>
                </div>
              </div>
              <div className="bg-brand-50 rounded-2xl border border-brand-100 p-5">
                <h3 className="font-semibold text-brand-800 mb-1 text-sm">Prepare for this Interview</h3>
                <p className="text-xs text-brand-600 mb-3">Browse {job.category?.name || "relevant"} interview questions.</p>
                <Link href={`/interview${job.category ? `?category=${job.category.slug}` : ""}`} className="btn-primary text-xs w-full flex items-center justify-center gap-1.5">
                  Practice Questions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
