// src/app/admin/page.tsx
// Admin dashboard home — shows key stats and recent activity

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Briefcase, BookOpen, MessageSquare, Tag,
  TrendingUp, Plus, ArrowRight, Eye
} from "lucide-react";
import { formatDate } from "@/lib/utils";

async function getDashboardStats() {
  try {
    const [
      totalJobs, activeJobs, totalBlogs, publishedBlogs,
      totalQuestions, totalCategories,
      recentJobs, recentBlogs,
    ] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { isActive: true } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true } }),
      prisma.interviewQuestion.count(),
      prisma.category.count(),
      prisma.job.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { category: true } }),
      prisma.blog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

    return {
      totalJobs, activeJobs, totalBlogs, publishedBlogs,
      totalQuestions, totalCategories, recentJobs, recentBlogs,
    };
  } catch {
    return {
      totalJobs: 0, activeJobs: 0, totalBlogs: 0, publishedBlogs: 0,
      totalQuestions: 0, totalCategories: 0, recentJobs: [], recentBlogs: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: "Total Jobs",
      value: stats.totalJobs,
      sub: `${stats.activeJobs} active`,
      icon: Briefcase,
      href: "/admin/jobs",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Blog Posts",
      value: stats.totalBlogs,
      sub: `${stats.publishedBlogs} published`,
      icon: BookOpen,
      href: "/admin/blog",
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Interview Q&A",
      value: stats.totalQuestions,
      sub: "questions & answers",
      icon: MessageSquare,
      href: "/admin/questions",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      sub: "across all sections",
      icon: Tag,
      href: "/admin/categories",
      color: "bg-teal-50 text-teal-600",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-0.5">
            Welcome back! Here&apos;s what&apos;s happening.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/jobs/new" className="btn-primary flex items-center gap-1.5 text-sm">
            <Plus size={15} />
            Add Job
          </Link>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-sm transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <card.icon size={19} />
                </div>
                <ArrowRight size={14} className="text-neutral-300 group-hover:text-neutral-500 transition-colors" />
              </div>
              <div className="text-3xl font-display text-neutral-900 mb-0.5">
                {card.value}
              </div>
              <div className="text-sm font-medium text-neutral-600">{card.label}</div>
              <div className="text-xs text-neutral-400 mt-0.5">{card.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-neutral-800">Recent Jobs</h2>
            <Link href="/admin/jobs" className="text-xs text-brand-500 hover:text-brand-600">
              View all →
            </Link>
          </div>

          {stats.recentJobs.length === 0 ? (
            <EmptyState message="No jobs yet" link="/admin/jobs/new" linkLabel="Add your first job" />
          ) : (
            <div className="space-y-2">
              {stats.recentJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-xs font-semibold text-neutral-500 shrink-0">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">{job.title}</p>
                    <p className="text-xs text-neutral-400">{job.company} · {formatDate(job.createdAt)}</p>
                  </div>
                  <span className={`badge text-xs shrink-0 ${job.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {job.isActive ? "Active" : "Inactive"}
                  </span>
                  <Link
                    href={`/admin/jobs/${job.id}/edit`}
                    className="text-xs text-neutral-400 hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-neutral-800">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-xs text-brand-500 hover:text-brand-600">
              View all →
            </Link>
          </div>

          {stats.recentBlogs.length === 0 ? (
            <EmptyState message="No blogs yet" link="/admin/blog/new" linkLabel="Write your first post" />
          ) : (
            <div className="space-y-2">
              {stats.recentBlogs.map((blog) => (
                <div key={blog.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                    <BookOpen size={14} className="text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">{blog.title}</p>
                    <p className="text-xs text-neutral-400 flex items-center gap-1">
                      <Eye size={10} />
                      {blog.views} views · {formatDate(blog.createdAt)}
                    </p>
                  </div>
                  <span className={`badge text-xs shrink-0 ${blog.isPublished ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/blog/${blog.id}/edit`}
                    className="text-xs text-neutral-400 hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-2xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Post a Job", href: "/admin/jobs/new", icon: Briefcase },
            { label: "Write a Blog", href: "/admin/blog/new", icon: BookOpen },
            { label: "Add Interview Q", href: "/admin/questions/new", icon: MessageSquare },
            { label: "Manage Categories", href: "/admin/categories", icon: Tag },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-700 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all"
            >
              <action.icon size={15} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message, link, linkLabel }: { message: string; link: string; linkLabel: string }) {
  return (
    <div className="text-center py-8 text-neutral-400">
      <p className="text-sm">{message}</p>
      <Link href={link} className="text-xs text-brand-500 hover:text-brand-600 mt-2 inline-block">
        {linkLabel} →
      </Link>
    </div>
  );
}
