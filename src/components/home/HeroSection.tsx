"use client";

// src/components/home/HeroSection.tsx
// The big hero banner at the top of the home page

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Briefcase, TrendingUp, ArrowRight } from "lucide-react";

// Quick search tags shown below the search bar
const popularSearches = [
  "Data Analyst",
  "SQL Developer",
  "HR Executive",
  "Business Analyst",
  "Remote Jobs",
  "Fresher Jobs",
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  // When user clicks search, redirect to jobs page with query params
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-brand-950 pt-20 pb-24">

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand-400/5 rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Announcement Badge ── */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/20 text-brand-300 rounded-full text-sm font-medium border border-brand-500/30">
            <TrendingUp size={14} />
            20+ New Jobs Added This Week
          </span>
        </div>

        {/* ── Main Heading ── */}
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Land Your{" "}
            <span className="text-brand-400 italic">Dream Career</span>
            <br />
            with Ramiorix
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover jobs, master interviews, and grow your career with
            expert guidance — all in one beautifully crafted platform.
          </p>
        </div>

        {/* ── Search Bar ── */}
        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl"
        >
          {/* Job title search */}
          <div className="flex-1 flex items-center gap-3 px-3">
            <Search size={18} className="text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, company, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-neutral-200 my-2" />

          {/* Location search */}
          <div className="flex items-center gap-3 px-3 md:w-48">
            <MapPin size={18} className="text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary flex items-center justify-center gap-2 px-6 md:px-8 rounded-xl"
          >
            <Search size={16} />
            <span>Search Jobs</span>
          </button>
        </form>

        {/* ── Popular Searches ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-neutral-500 text-sm">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                router.push(`/jobs?q=${encodeURIComponent(term)}`);
              }}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-neutral-300 rounded-lg text-sm transition-colors border border-white/10"
            >
              {term}
            </button>
          ))}
        </div>

        {/* ── Quick Links ── */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="/interview"
            className="flex items-center gap-2 text-neutral-300 hover:text-white text-sm transition-colors"
          >
            <Briefcase size={15} />
            Prepare for Interviews
            <ArrowRight size={13} />
          </a>
          <span className="text-neutral-700">•</span>
          <a
            href="/fresher"
            className="flex items-center gap-2 text-neutral-300 hover:text-white text-sm transition-colors"
          >
            <TrendingUp size={15} />
            Fresher Guidance
            <ArrowRight size={13} />
          </a>
        </div>

      </div>
    </section>
  );
}
