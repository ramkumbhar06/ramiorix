"use client";

// src/components/admin/BlogForm.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Blog, Category } from "@/types";
import { slugify } from "@/lib/utils";
import { Save, Loader2 } from "lucide-react";

type Props = { blog?: Blog | null; categories: Category[] };

export default function BlogForm({ blog, categories }: Props) {
  const router = useRouter();
  const isEditing = !!blog;

  const [form, setForm] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    coverImage: blog?.coverImage || "",
    tags: blog?.tags?.join(", ") || "", // Store as comma-separated string for easy editing
    categoryId: blog?.categoryId || "",
    isPublished: blog?.isPublished ?? false,
    isFeatured: blog?.isFeatured ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categorySearch, setCategorySearch] =
  useState("");

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      // Auto-generate slug when title changes (only for new posts)
      ...(field === "title" && !isEditing ? { slug: slugify(value as string) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Convert tags string "react, career, sql" → ["react", "career", "sql"]
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch(
        isEditing ? `/api/blog/${blog.id}` : "/api/blog",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, tags }),
        }
      );

      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Meta Info */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <h2 className="font-semibold text-neutral-800">Post Details</h2>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. How to Crack Your First Data Analyst Interview"
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">
            URL Slug <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-sm">/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="how-to-crack-data-analyst-interview"
              className="input flex-1 font-mono text-sm"
              required
            />
          </div>
          <p className="text-xs text-neutral-400 mt-1">Auto-generated from title. Keep it lowercase with dashes.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">
            Excerpt (Short Description) <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="A brief 1-2 sentence summary shown on blog cards..."
            className="input min-h-[70px] resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Cover Image URL</label>
            <input
              type="url"
              value={form.coverImage}
              onChange={(e) => update("coverImage", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="input"
            />
          </div>
          <div>
            <div>
  <label className="block text-xs font-medium text-neutral-600 mb-1.5">
    Category
  </label>

  <input
    type="text"
    placeholder="Search category..."
    value={
      form.categoryId
        ? categories.find(
            (c) => c.id === form.categoryId
          )?.name || ""
        : categorySearch
    }
    onChange={(e) => {
      update("categoryId", "");
      setCategorySearch(e.target.value);
    }}
    className="input mb-2"
  />

  <div className="border border-neutral-200 rounded-xl max-h-48 overflow-y-auto bg-white">

    <button
      type="button"
      onClick={() => {
        update("categoryId", "");
        setCategorySearch("");
      }}
      className="w-full text-left px-3 py-2 hover:bg-neutral-100"
    >
      No Category
    </button>

    {categories
      .filter((cat) =>
        cat.name
          .toLowerCase()
          .includes(
            categorySearch.toLowerCase()
          )
      )
      .map((cat) => (

        <button
          key={cat.id}
          type="button"
          onClick={() => {
            update("categoryId", cat.id);
            setCategorySearch(cat.name);
          }}
          className={`w-full text-left px-3 py-2 hover:bg-neutral-100 ${
            form.categoryId === cat.id
              ? "bg-brand-50 text-brand-600"
              : ""
          }`}
        >
          {cat.name}
        </button>

      ))}

  </div>

  {form.categoryId && (
    <p className="mt-2 text-xs text-green-600">
      Selected:{" "}
      {
        categories.find(
          (c) => c.id === form.categoryId
        )?.name
      }
    </p>
  )}
</div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="career, interview, sql, data analyst"
            className="input"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-neutral-800 mb-4">
          Content <span className="text-red-400">*</span>
        </h2>
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          placeholder="Write your blog post content here. You can use plain text or HTML..."
          className="input min-h-[300px] resize-y font-mono text-sm"
          required
        />
        <p className="text-xs text-neutral-400 mt-2">
          💡 Tip: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt; for formatting.
        </p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-neutral-800 mb-4">Settings</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => update("isPublished", e.target.checked)} className="w-4 h-4 rounded accent-brand-500" />
            <div>
              <span className="text-sm font-medium text-neutral-700">Published</span>
              <p className="text-xs text-neutral-400">Make visible on the public blog</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="w-4 h-4 rounded accent-brand-500" />
            <div>
              <span className="text-sm font-medium text-neutral-700">Featured</span>
              <p className="text-xs text-neutral-400">Show prominently on home page</p>
            </div>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button type="button" onClick={() => router.back()} className="btn-ghost">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
          {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> {isEditing ? "Save Changes" : "Publish Post"}</>}
        </button>
      </div>
    </form>
  );
}
