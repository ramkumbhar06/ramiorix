// src/app/blog/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";
import { Eye, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Career Blog",
  description: "Expert career tips, interview guides, and industry insights.",
};

const placeholderBlogs = [
  { id: "1", title: "How to Crack Data Analyst Interview in 2025", slug: "crack-data-analyst-interview-2025", excerpt: "A complete guide covering SQL, Excel, and analytical thinking questions freshers face.", coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop", tags: ["interview", "data analyst"], views: 4280, isFeatured: true, createdAt: new Date(Date.now() - 172800000), category: { name: "Career Tips", slug: "career-tips" } },
  { id: "2", title: "Top 10 SQL Queries Every Analyst Should Know", slug: "top-sql-queries-analyst", excerpt: "Master these 10 essential SQL queries for your daily analytics work.", coverImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop", tags: ["sql", "tutorial"], views: 6100, isFeatured: false, createdAt: new Date(Date.now() - 432000000), category: { name: "Tutorials", slug: "tutorials" } },
  { id: "3", title: "US Mortgage Industry: Career Guide for Indian Professionals", slug: "us-mortgage-career-guide-india", excerpt: "Everything you need to know to build a successful career in US Mortgage.", coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop", tags: ["mortgage", "career"], views: 3420, isFeatured: false, createdAt: new Date(Date.now() - 604800000), category: { name: "Industry Guide", slug: "industry-guide" } },
  { id: "4", title: "Resume Writing Guide for Fresh Graduates", slug: "resume-writing-fresh-graduates", excerpt: "Build a standout resume with no work experience. Tips, templates, and examples.", coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop", tags: ["resume", "fresher"], views: 8900, isFeatured: false, createdAt: new Date(Date.now() - 864000000), category: { name: "Fresher Guide", slug: "fresher-guide" } },
  { id: "5", title: "5 HR Interview Questions You Must Prepare For", slug: "hr-interview-questions-must-prepare", excerpt: "The most commonly asked HR questions with sample answers that actually work.", coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop", tags: ["hr", "interview"], views: 5600, isFeatured: false, createdAt: new Date(Date.now() - 1296000000), category: { name: "Interview Prep", slug: "interview-prep" } },
  { id: "6", title: "Remote Work Tips for First-Time Remote Employees", slug: "remote-work-tips-first-time", excerpt: "Practical strategies to stay productive and grow your career while working from home.", coverImage: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=400&fit=crop", tags: ["remote", "productivity"], views: 2100, isFeatured: false, createdAt: new Date(Date.now() - 1728000000), category: { name: "Career Tips", slug: "career-tips" } },
];

async function getBlogs() {
  try {
    return await prisma.blog.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
  } catch { return []; }
}

export default async function BlogPage() {
  const dbBlogs = await getBlogs();
  const blogs = dbBlogs.length > 0 ? dbBlogs : (placeholderBlogs as any[]);
  const featured = blogs.find((b: any) => b.isFeatured) || blogs[0];
  const rest = blogs.filter((b: any) => b.id !== featured?.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-neutral-50">
        <div className="container-custom py-10">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-display text-neutral-900 mb-3">Career Insights</h1>
            <p className="text-neutral-500">Expert knowledge to accelerate your career</p>
          </div>

          {/* Featured Blog */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="block mb-8">
              <article className="card overflow-hidden group">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto relative overflow-hidden bg-neutral-100">
                    {featured.coverImage && (
                      <img src={featured.coverImage} alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <span className="absolute top-4 left-4 badge bg-brand-500 text-white">Featured</span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    {featured.category && (
                      <span className="badge bg-brand-100 text-brand-600 mb-3 self-start">{featured.category.name}</span>
                    )}
                    <h2 className="font-display text-2xl text-neutral-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                      <span className="flex items-center gap-1"><Clock size={11} />{formatDate(featured.createdAt)}</span>
                      <span className="flex items-center gap-1"><Eye size={11} />{featured.views?.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((blog: any) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="block">
                <article className="card overflow-hidden group h-full flex flex-col">
                  {blog.coverImage && (
                    <div className="h-44 overflow-hidden bg-neutral-100">
                      <img src={blog.coverImage} alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {blog.category && (
                      <span className="badge bg-neutral-100 text-neutral-600 text-xs mb-2 self-start">{blog.category.name}</span>
                    )}
                    <h3 className="font-semibold text-neutral-800 text-sm leading-snug mb-2 group-hover:text-brand-600 transition-colors flex-1">
                      {blog.title}
                    </h3>
                    <p className="text-neutral-500 text-xs mb-3 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {blog.tags?.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="badge bg-brand-50 text-brand-500 text-xs">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                      <span>{formatDate(blog.createdAt)}</span>
                      <span className="flex items-center gap-1"><Eye size={10} />{blog.views?.toLocaleString()}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}