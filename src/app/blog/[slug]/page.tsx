// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Eye, Tag } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (!blog) return { title: "Blog Not Found" };
    return { title: blog.title, description: blog.excerpt, openGraph: { title: blog.title, description: blog.excerpt, images: blog.coverImage ? [blog.coverImage] : [] } };
  } catch { return { title: "Blog" }; }
}

async function getBlog(slug: string) {
  try {
    const blog = await prisma.blog.findUnique({ where: { slug, isPublished: true }, include: { category: true } });
    if (blog) { prisma.blog.update({ where: { id: blog.id }, data: { views: { increment: 1 } } }).catch(() => {}); }
    return blog;
  } catch { return null; }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-neutral-50 py-10">
        <div className="container-custom">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="max-w-3xl mx-auto">
            {blog.coverImage && (
              <div className="rounded-2xl overflow-hidden mb-8 aspect-video bg-neutral-100">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
            <article className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
              {blog.category && <span className="badge bg-brand-100 text-brand-600 mb-4 inline-block">{blog.category.name}</span>}
              <h1 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4 leading-tight">{blog.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 pb-6 mb-6 border-b border-neutral-100">
                <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(blog.createdAt)}</span>
                <span className="flex items-center gap-1.5"><Eye size={14} />{blog.views.toLocaleString()} views</span>
              </div>
              <p className="text-neutral-600 text-base leading-relaxed mb-4 whitespace-pre-wrap">{blog.content}</p>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-neutral-100">
                  <Tag size={14} className="text-neutral-400 mt-0.5" />
                  {blog.tags.map((tag) => <span key={tag} className="badge bg-neutral-100 text-neutral-600">#{tag}</span>)}
                </div>
              )}
            </article>
            <div className="mt-6 bg-brand-50 rounded-2xl border border-brand-100 p-6 text-center">
              <h3 className="font-semibold text-brand-800 mb-2">Ready to put this into action?</h3>
              <p className="text-brand-600 text-sm mb-4">Browse jobs and practice interview questions on Ramiorix.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/jobs" className="btn-primary text-sm">Browse Jobs</Link>
                <Link href="/interview" className="btn-ghost text-sm">Practice Interviews</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
