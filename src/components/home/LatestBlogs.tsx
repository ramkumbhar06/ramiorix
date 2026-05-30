// src/components/home/LatestBlogs.tsx

import Link from "next/link";
import { ArrowRight, Clock, Eye } from "lucide-react";
import { Blog } from "@/types";
import { formatDate } from "@/lib/utils";

type Props = { blogs: Blog[] };

const placeholderBlogs: Partial<Blog>[] = [
  {
    id: "1",
    title: "How to Crack Your First Data Analyst Interview in 2025",
    slug: "crack-data-analyst-interview-2025",
    excerpt: "A complete guide covering the most important SQL, Excel, and analytical thinking questions freshers face in data analyst interviews — with sample answers.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
    tags: ["interview", "data analyst", "fresher"],
    views: 4280,
    createdAt: new Date(Date.now() - 172800000),
    category: { id: "1", name: "Career Tips", slug: "career-tips", type: "blog", createdAt: new Date() },
  },
  {
    id: "2",
    title: "Top 10 SQL Queries Every Analyst Should Know",
    slug: "top-sql-queries-analyst",
    excerpt: "Master these 10 essential SQL queries and you'll be able to handle 80% of the data tasks you'll encounter as a data analyst.",
    coverImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=300&fit=crop",
    tags: ["sql", "tutorial", "analytics"],
    views: 6100,
    createdAt: new Date(Date.now() - 432000000),
    category: { id: "2", name: "Tutorials", slug: "tutorials", type: "blog", createdAt: new Date() },
  },
  {
    id: "3",
    title: "US Mortgage Industry: A Career Guide for Indian Professionals",
    slug: "us-mortgage-career-guide-india",
    excerpt: "The US Mortgage industry is one of the largest employers of finance professionals in India. Here's everything you need to know to build a career in it.",
    coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop",
    tags: ["mortgage", "career", "finance"],
    views: 3420,
    createdAt: new Date(Date.now() - 604800000),
    category: { id: "3", name: "Industry Guide", slug: "industry-guide", type: "blog", createdAt: new Date() },
  },
];

export default function LatestBlogs({ blogs }: Props) {
  const displayBlogs = blogs.length > 0 ? blogs : (placeholderBlogs as Blog[]);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Career Insights</h2>
            <p className="section-sub">Expert blogs to accelerate your growth</p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
          >
            Read all blogs
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayBlogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="block">
              <article className="card overflow-hidden h-full flex flex-col group">
                {/* Cover Image */}
                {blog.coverImage && (
                  <div className="relative h-44 overflow-hidden bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    {blog.category && (
                      <span className="absolute top-3 left-3 badge bg-white/90 text-neutral-700 text-xs backdrop-blur-sm">
                        {blog.category.name}
                      </span>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="badge bg-brand-50 text-brand-600 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-neutral-800 text-sm leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2 flex-1">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={11} />
                      {blog.views.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
