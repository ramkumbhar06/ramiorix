// src/app/admin/categories/page.tsx
// Manage all categories for jobs, blogs, and interview questions

"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: string;
  color?: string | null;
  createdAt: Date;
};

const TYPE_LABELS: Record<string, string> = {
  job: "Jobs",
  blog: "Blog",
  interview: "Interview",
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-neutral-900">Categories</h1>
          <p className="text-neutral-500 text-sm">Organize content with categories</p>
        </div>
        <button
          onClick={() => { setEditingCategory(null); setShowForm(true); }}
          className="btn-primary flex items-center gap-1.5 text-sm"
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onClose={() => { setShowForm(false); setEditingCategory(null); }}
          onSaved={() => { setShowForm(false); fetchCategories(); }}
        />
      )}

      {/* Categories grouped by type */}
      {loading ? (
        <div className="text-center py-16 text-neutral-400">
          <Loader2 size={24} className="animate-spin mx-auto" />
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(TYPE_LABELS).map(([type, label]) => {
            const grouped = categories.filter((c) => c.type === type);
            return (
              <div key={type} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100 bg-neutral-50">
                  <h2 className="font-semibold text-neutral-700 text-sm">{label} Categories</h2>
                  <span className="badge bg-neutral-100 text-neutral-500 text-xs">{grouped.length}</span>
                </div>

                {grouped.length === 0 ? (
                  <p className="text-center py-6 text-neutral-400 text-sm">No {label.toLowerCase()} categories yet</p>
                ) : (
                  <div className="divide-y divide-neutral-50">
                    {grouped.map((cat) => (
                      <div key={cat.id} className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-50 transition-colors group">
                        {/* Color dot */}
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: cat.color || "#9fa6ba" }}
                        />
                        <div className="flex-1">
                          <span className="font-medium text-neutral-800 text-sm">{cat.name}</span>
                          <span className="text-neutral-400 text-xs ml-2 font-mono">/{cat.slug}</span>
                          {cat.description && (
                            <p className="text-xs text-neutral-400 mt-0.5">{cat.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingCategory(cat); setShowForm(true); }}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Inline Category Form (modal) ──
function CategoryForm({
  category,
  onClose,
  onSaved,
}: {
  category: Category | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!category;
  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    type: category?.type || "job",
    color: category?.color || "#4a63f5",
  });
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "name" && !isEditing
        ? { slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") }
        : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        isEditing ? `/api/categories/${category.id}` : "/api/categories",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) onSaved();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-neutral-800">{isEditing ? "Edit Category" : "Add Category"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Name</label>
            <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="input" required placeholder="e.g. Data Analyst" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input font-mono text-sm" required placeholder="data-analyst" />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Type</label>
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className="input">
              <option value="job">Jobs</option>
              <option value="blog">Blog</option>
              <option value="interview">Interview</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Description</label>
            <input type="text" value={form.description} onChange={(e) => update("description", e.target.value)} className="input" placeholder="Optional description" />
          </div>
          <div className="flex items-center gap-3">
            <label className="block text-xs font-medium text-neutral-600">Color</label>
            <input type="color" value={form.color} onChange={(e) => update("color", e.target.value)} className="w-10 h-8 rounded-lg border border-neutral-200 p-0.5 cursor-pointer" />
            <span className="text-xs text-neutral-400 font-mono">{form.color}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {isEditing ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
