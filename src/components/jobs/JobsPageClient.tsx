"use client";

// src/components/jobs/JobsPageClient.tsx
// Handles search/filter UI on the jobs page (needs "use client" for interactivity)

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import JobCard from "./JobCard";
import { Job, Category } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  initialJobs: Job[];
  categories: Category[];
  searchParams: { [key: string]: string | undefined };
};

const experienceLevels = ["Fresher", "1-3 years", "3-5 years", "5+ years"];
const jobTypes = ["Full-time", "Part-time", "Remote", "Hybrid", "Contract"];

export default function JobsPageClient({ initialJobs, categories, searchParams }: Props) {
  const router = useRouter();

  // Local state for filter values
  const [search, setSearch] = useState(searchParams.q || "");
  const [location, setLocation] = useState(searchParams.location || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || "");
  const [selectedExperience, setSelectedExperience] = useState(searchParams.experience || "");
  const [selectedType, setSelectedType] = useState(searchParams.type || "");
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters — update the URL with query params
  function applyFilters() {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (location) params.set("location", location);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedExperience) params.set("experience", selectedExperience);
    if (selectedType) params.set("type", selectedType);
    router.push(`/jobs?${params.toString()}`);
  }

  // Clear all filters
  function clearFilters() {
    setSearch("");
    setLocation("");
    setSelectedCategory("");
    setSelectedExperience("");
    setSelectedType("");
    router.push("/jobs");
  }

  // Count active filters
  const activeFilterCount = [selectedCategory, selectedExperience, selectedType].filter(Boolean).length;

  return (
    <div className="container-custom py-10">

      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-neutral-900 mb-2">
          Browse Jobs
        </h1>
        <p className="text-neutral-500">
          {initialJobs.length} opportunities available
          {searchParams.q && ` for "${searchParams.q}"`}
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-3 flex flex-col md:flex-row gap-2 mb-4 shadow-sm">
        {/* Title Search */}
        <div className="flex-1 flex items-center gap-2 px-2">
          <Search size={16} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Job title, company, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="flex-1 py-2 text-sm focus:outline-none text-neutral-800 placeholder:text-neutral-400"
          />
        </div>

        <div className="w-px bg-neutral-100 hidden md:block" />

        {/* Location Search */}
        <div className="flex items-center gap-2 px-2 md:w-40">
          <MapPin size={16} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="flex-1 py-2 text-sm focus:outline-none text-neutral-800 placeholder:text-neutral-400"
          />
        </div>

        {/* Filter Toggle + Search Button */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "btn-ghost flex items-center gap-2 relative",
              activeFilterCount > 0 && "border-brand-300 text-brand-600"
            )}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <button onClick={applyFilters} className="btn-primary">
            Search
          </button>
        </div>
      </div>

      {/* ── Filter Panel ── */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 mb-6 shadow-sm animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Experience</label>
              <div className="flex flex-wrap gap-1.5">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedExperience(selectedExperience === level ? "" : level)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs border transition-all",
                      selectedExperience === level
                        ? "bg-brand-500 text-white border-brand-500"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Job Type</label>
              <div className="flex flex-wrap gap-1.5">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(selectedType === type ? "" : type)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs border transition-all",
                      selectedType === type
                        ? "bg-brand-500 text-white border-brand-500"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-500 mt-4 transition-colors"
            >
              <X size={12} /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* ── Jobs Grid ── */}
      {initialJobs.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium text-neutral-600">No jobs found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-ghost mt-4 text-sm">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialJobs.map((job) => (
            <JobCard key={job.id} job={job} featured={job.isFeatured} />
          ))}
        </div>
      )}
    </div>
  );
}
