"use client";

// src/components/admin/QuestionForm.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InterviewQuestion, Category } from "@/types";
import { Save, Loader2 } from "lucide-react";

type Props = { question?: InterviewQuestion | null; categories: Category[] };

export default function QuestionForm({ question, categories }: Props) {
  const router = useRouter();
  const isEditing = !!question;

  const [form, setForm] = useState({
    question: question?.question || "",
    answer: question?.answer || "",
    difficulty: question?.difficulty || "Medium",
    tags: question?.tags?.join(", ") || "",
    categoryId: question?.categoryId || "",
    isPublished: question?.isPublished ?? true,
    isFeatured: question?.isFeatured ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    try {
      const res = await fetch(
        isEditing ? `/api/questions/${question.id}` : "/api/questions",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, tags }),
        }
      );

      if (res.ok) {
        router.push("/admin/questions");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <h2 className="font-semibold text-neutral-800">Question Details</h2>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">Question <span className="text-red-400">*</span></label>
          <textarea
            value={form.question}
            onChange={(e) => update("question", e.target.value)}
            placeholder="Write the interview question..."
            className="input min-h-[80px] resize-y"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">Answer <span className="text-red-400">*</span></label>
          <textarea
            value={form.answer}
            onChange={(e) => update("answer", e.target.value)}
            placeholder="Provide a detailed, helpful answer..."
            className="input min-h-[160px] resize-y"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Difficulty</label>
            <select value={form.difficulty} onChange={(e) => update("difficulty", e.target.value)} className="input">
              {["Easy", "Medium", "Hard"].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Category</label>
            <select value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className="input">
              <option value="">No Category</option>
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="sql, joins, database"
              className="input"
            />
          </div>
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => update("isPublished", e.target.checked)} className="w-4 h-4 rounded accent-brand-500" />
            <span className="text-sm text-neutral-700">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="w-4 h-4 rounded accent-brand-500" />
            <span className="text-sm text-neutral-700">Featured</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => router.back()} className="btn-ghost">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
          {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> {isEditing ? "Save Changes" : "Add Question"}</>}
        </button>
      </div>
    </form>
  );
}
