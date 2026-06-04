// src/app/admin/blog/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminBlogsTable from "@/components/admin/AdminBlogsTable";


export default async function AdminBlogPage() {
  const blogs = await prisma.blog.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-neutral-900">Blog Posts</h1>
          <p className="text-neutral-500 text-sm">{blogs.length} total posts</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} /> Write New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">

  {blogs.length === 0 ? (
    <div className="text-center py-16 text-neutral-400">
      <div className="text-4xl mb-3">✍️</div>

      <p className="font-medium text-neutral-600">
        No blog posts yet
      </p>

      <Link
        href="/admin/blog/new"
        className="btn-primary text-sm mt-4 inline-flex items-center gap-1.5"
      >
        <Plus size={14} />
        Write your first post
      </Link>
    </div>
  ) : (
    <AdminBlogsTable blogs={blogs} />
  )}

</div>
    </div>
  );
}
