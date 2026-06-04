// src/components/admin/AdminBlogsTable.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  Search,
  X,
  Pencil,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default function AdminBlogsTable({
  blogs,
}: {
  blogs: any[];
}) {
  const [search, setSearch] =
    useState("");

  const filteredBlogs =
    blogs.filter(
      (blog) =>
        `${blog.title || ""} ${
          blog.slug || ""
        } ${
          blog.category?.name || ""
        }`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div>

      {/* Search */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-neutral-400
            "
          />

          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              h-11
              pl-10
              pr-10
              rounded-xl
              border
              border-neutral-300
              dark:border-neutral-700
              bg-white
              dark:bg-neutral-900
            "
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-neutral-400
              "
            >
              <X size={16} />
            </button>
          )}

        </div>

      </div>

      {filteredBlogs.length === 0 ? (
        <div className="py-12 text-center text-neutral-500">
          No blogs found
        </div>
      ) : (
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
                {filteredBlogs.map((blog) => (
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
                        {blog.isPublished ? (
                          <span className="flex items-center gap-1"><Eye size={10} /> Published</span>
                        ) : (
                          <span className="flex items-center gap-1"><EyeOff size={10} /> Draft</span>
                        )}
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
      )}

    </div>
  );
}