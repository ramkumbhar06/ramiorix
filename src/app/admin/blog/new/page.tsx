// src/app/admin/blog/new/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogForm from "@/components/admin/BlogForm";

export default async function NewBlogPage() {
  const categories = await prisma.category.findMany({
    where: { type: "blog" }, orderBy: { name: "asc" },
  }).catch(() => []);

  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to Blog
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-display text-neutral-900">Write New Post</h1>
        <p className="text-neutral-500 text-sm mt-0.5">Create a new blog post for your readers</p>
      </div>
      <BlogForm categories={categories as any} />
    </div>
  );
}
