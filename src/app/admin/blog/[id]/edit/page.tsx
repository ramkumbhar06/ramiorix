import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogForm from "@/components/admin/BlogForm";
import type { Blog, Category } from "@prisma/client";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  let blog: (Blog & { category: Category | null }) | null = null;
  let categories: Category[] = [];
  try {
    [blog, categories] = await Promise.all([
      prisma.blog.findUnique({ where: { id }, include: { category: true } }),
      prisma.category.findMany({ where: { type: "blog" }, orderBy: { name: "asc" } }),
    ]);
  } catch {}
  if (!blog) notFound();
  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to Blog
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-display text-neutral-900">Edit Post</h1>
        <p className="text-neutral-500 text-sm line-clamp-1">{blog.title}</p>
      </div>
      <BlogForm blog={blog as any} categories={categories as any} />
    </div>
  );
}
