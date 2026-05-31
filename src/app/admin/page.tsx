// src/app/admin/page.tsx — responsive admin dashboard

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Briefcase, BookOpen, MessageSquare, Tag,
  Plus, ArrowRight, Eye
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";

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
    return { totalJobs, activeJobs, totalBlogs, publishedBlogs, totalQuestions, totalCategories, recentJobs, recentBlogs };
  } catch {
    return { totalJobs: 0, activeJobs: 0, totalBlogs: 0, publishedBlogs: 0, totalQuestions: 0, totalCategories: 0, recentJobs: [], recentBlogs: [] };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Total Jobs", value: stats.totalJobs, sub: `${stats.activeJobs} active`, icon: Briefcase, href: "/admin/jobs", color: "bg-blue-50 text-blue-600" },
    { label: "Blog Posts", value: stats.totalBlogs, sub: `${stats.publishedBlogs} published`, icon: BookOpen, href: "/admin/blog", color: "bg-purple-50 text-purple-600" },
    { label: "Interview Q&A", value: stats.totalQuestions, sub: "questions", icon: MessageSquare, href: "/admin/questions", color: "bg-orange-50 text-orange-600" },
    { label: "Categories", value: stats.totalCategories, sub: "total", icon: Tag, href: "/admin/categories", color: "bg-teal-50 text-teal-600" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-display text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-0.5 hidden sm:block">Welcome back!</p>
        </div>
        <Link href="/admin/jobs/new" className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} />
          <span className="hidden sm:inline">Add Job</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Stats Grid — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 hover:border-neutral-300 hover:shadow-sm transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                  <card.icon size={17} />
                </div>
                <ArrowRight size={13} className="text-neutral-300 group-hover:text-neutral-500 transition-colors" />
              </div>
              <div className="text-2xl md:text-3xl font-display text-neutral-900 mb-0.5">{card.value}</div>
              <div className="text-xs md:text-sm font-medium text-neutral-600">{card.label}</div>
              <div className="text-xs text-neutral-400 mt-0.5">{card.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity — stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-neutral-800">Recent Jobs</h2>
            <Link href="/admin/jobs" className="text-xs text-brand-500 hover:text-brand-600">View all →</Link>
          </div>
          {stats.recentJobs.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <p className="text-sm">No jobs yet</p>
              <Link href="/admin/jobs/new" className="text-xs text-brand-500 mt-2 inline-block">Add your first job →</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.recentJobs.map((job) => (
                <div key={job.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-xs font-semibold text-neutral-500 shrink-0">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">{job.title}</p>
                    <p className="text-xs text-neutral-400 truncate">{job.company}</p>
                  </div>
                  <span className={`badge text-xs shrink-0 hidden sm:inline-flex ${job.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {job.isActive ? "Active" : "Off"}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                    <Link href={`/admin/jobs/${job.id}/edit`} className="text-xs text-brand-500 hover:text-brand-600">Edit</Link>
                    <DeleteButton id={job.id} type="job" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-neutral-800">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-xs text-brand-500 hover:text-brand-600">View all →</Link>
          </div>
          {stats.recentBlogs.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <p className="text-sm">No blogs yet</p>
              <Link href="/admin/blog/new" className="text-xs text-brand-500 mt-2 inline-block">Write your first post →</Link>
            </div>
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
                      <Eye size={10} />{blog.views} views
                    </p>
                  </div>
                  <span className={`badge text-xs shrink-0 hidden sm:inline-flex ${blog.isPublished ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                    {blog.isPublished ? "Live" : "Draft"}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                    <Link href={`/admin/blog/${blog.id}/edit`} className="text-xs text-brand-500 hover:text-brand-600">Edit</Link>
                    <DeleteButton id={blog.id} type="blog" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 md:mt-6 bg-white rounded-2xl border border-neutral-200 p-4 md:p-5">
        <h2 className="font-semibold text-neutral-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3">
          {[
            { label: "Post a Job", href: "/admin/jobs/new", icon: Briefcase },
            { label: "Write a Blog", href: "/admin/blog/new", icon: BookOpen },
            { label: "Add Interview Q", href: "/admin/questions/new", icon: MessageSquare },
            { label: "Categories", href: "/admin/categories", icon: Tag },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-neutral-200 text-xs md:text-sm text-neutral-700 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all justify-center sm:justify-start"
            >
              <action.icon size={14} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}