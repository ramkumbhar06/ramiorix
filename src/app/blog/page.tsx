// src/app/admin/blog/page.tsx — responsive blog list

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const blogs = await prisma.blog.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-display text-neutral-900">Blog Posts</h1>
          <p className="text-neutral-500 text-sm">{blogs.length} total</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary flex items-center gap-1.5 text-sm">
          <Plus size={15} /> Write Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 text-center py-16 text-neutral-400">
          <div className="text-4xl mb-3">✍️</div>
          <p className="font-medium text-neutral-600">No blog posts yet</p>
          <Link href="/admin/blog/new" className="btn-primary text-sm mt-4 inline-flex items-center gap-1.5">
            <Plus size={14} /> Write your first post
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-2xl border border-neutral-200 p-4">
                <div className="flex items-start gap-3 mb-3">
                  {blog.isFeatured && <Star size={12} className="text-yellow-400 fill-yellow-400 mt-1 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-800 text-sm line-clamp-2">{blog.title}</p>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">/{blog.slug}</p>
                  </div>
                  <span className={`badge text-xs shrink-0 ${blog.isPublished ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                    {blog.isPublished ? "Live" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><Eye size={10}/>{blog.views}</span>
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/blog/${blog.id}/edit`} className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors">
                      <Pencil size={14} />
                    </Link>
                    <DeleteButton id={blog.id} type="blog" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <th className="text-left px-5 py-3 font-medium text-neutral-500 text-xs">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Category</th>
                    <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Views</th>
                    <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-neutral-500 text-xs">Date</th>
                    <th className="text-right px-5 py-3 font-medium text-neutral-500 text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          {blog.isFeatured && <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />}
                          <span className="font-medium text-neutral-800 line-clamp-1">{blog.title}</span>
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">/{blog.slug}</span>
                      </td>
                      <td className="px-4 py-3.5 text-neutral-500 text-xs">{blog.category?.name || "—"}</td>
                      <td className="px-4 py-3.5 text-neutral-600">{blog.views.toLocaleString()}</td>
                      <td className="px-4 py-3.5">
                        <span className={`badge text-xs ${blog.isPublished ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                          {blog.isPublished ? <span className="flex items-center gap-1"><Eye size={10}/> Published</span> : <span className="flex items-center gap-1"><EyeOff size={10}/> Draft</span>}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-neutral-400 text-xs">{formatDate(blog.createdAt)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/blog/${blog.id}/edit`} className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors">
                            <Pencil size={14} />
                          </Link>
                          <DeleteButton id={blog.id} type="blog" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}