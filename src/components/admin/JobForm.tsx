"use client";

// src/components/admin/JobForm.tsx
// Reusable form for both creating AND editing jobs

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Job, Category } from "@/types";
import { cn } from "@/lib/utils";
import { Save, Loader2 } from "lucide-react";


type Props = {
  job?: Job | null;          // If editing, pass the existing job
  categories: Category[];   // Available categories for dropdown
};

export default function JobForm({ job, categories }: Props) {
  const router = useRouter();
  const isEditing = !!job; // True if we're editing an existing job

  // Form state — pre-fill with existing data if editing
  const [form, setForm] = useState({
    title: job?.title || "",
    company: job?.company || "",
    logo: job?.logo || "",
    location: job?.location || "",
    type: job?.type || "Full-time",
    experience: job?.experience || "Fresher",
    salary: job?.salary || "",
    description: job?.description || "",
    requirements: job?.requirements || "",
    benefits: job?.benefits || "",
    applyUrl: job?.applyUrl || "",
    categoryId: job?.categoryId || "",
    isActive: job?.isActive ?? true,
    isFeatured: job?.isFeatured ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categorySearch, setCategorySearch] =
  useState("");

  // Helper to update one field at a time
  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        isEditing ? `/api/jobs/${job.id}` : "/api/jobs",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        router.push("/admin/jobs");
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* ── Basic Info ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-neutral-800 mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">
              Job Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Senior Data Analyst"
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">
              Company Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="e.g. TechCorp India"
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">
              Company Logo URL
            </label>
            <input
              type="url"
              value={form.logo}
              onChange={(e) => update("logo", e.target.value)}
              placeholder="https://..."
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">
              Location <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Bangalore, Karnataka"
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">
              Job Type <span className="text-red-400">*</span>
            </label>
            <select
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
              className="input"
            >
              {["Full-time", "Part-time", "Remote", "Hybrid", "Contract"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">
              Experience Level <span className="text-red-400">*</span>
            </label>
            <select
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
              className="input"
            >
              {["Fresher", "1-3 years", "3-5 years", "5+ years"].map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Salary Range</label>
            <input
              type="text"
              value={form.salary}
              onChange={(e) => update("salary", e.target.value)}
              placeholder="e.g. ₹8-14 LPA"
              className="input"
            />
          </div>

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

  {/* Selected Category */}
  {form.categoryId && (
    <p className="mt-2 text-xs text-green-600">
      Selected:
      {" "}
      {
        categories.find(
          (c) => c.id === form.categoryId
        )?.name
      }
    </p>
  )}
</div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">
              Application URL
            </label>
            <input
              type="url"
              value={form.applyUrl}
              onChange={(e) => update("applyUrl", e.target.value)}
              placeholder="https://company.com/apply"
              className="input"
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <h2 className="font-semibold text-neutral-800">Job Content</h2>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">
            Job Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Describe the role, responsibilities, team, and work environment..."
            className="input min-h-[120px] resize-y"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">
            Requirements <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.requirements}
            onChange={(e) => update("requirements", e.target.value)}
            placeholder="List required skills, qualifications, and experience..."
            className="input min-h-[120px] resize-y"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">Benefits</label>
          <textarea
            value={form.benefits}
            onChange={(e) => update("benefits", e.target.value)}
            placeholder="Health insurance, flexible hours, WFH, etc."
            className="input min-h-[80px] resize-y"
          />
        </div>
      </div>

      {/* ── Settings ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="font-semibold text-neutral-800 mb-4">Settings</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => update("isActive", e.target.checked)}
              className="w-4 h-4 rounded accent-brand-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-700">Active</span>
              <p className="text-xs text-neutral-400">Show this job publicly</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => update("isFeatured", e.target.checked)}
              className="w-4 h-4 rounded accent-brand-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-700">Featured</span>
              <p className="text-xs text-neutral-400">Highlight on the home page</p>
            </div>
          </label>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-ghost"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? (
            <><Loader2 size={15} className="animate-spin" /> Saving...</>
          ) : (
            <><Save size={15} /> {isEditing ? "Save Changes" : "Post Job"}</>
          )}
        </button>
      </div>
    </form>
  );
}
