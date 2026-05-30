// src/lib/utils.ts
// Helper functions used throughout the app

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges Tailwind classes safely (avoids conflicts like "px-2 px-4" → "px-4")
// Use this whenever you combine conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converts "My Blog Post Title" → "my-blog-post-title" for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces with dashes
    .replace(/^-+|-+$/g, "");  // Remove leading/trailing dashes
}

// Formats dates nicely: "2024-01-15" → "January 15, 2024"
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Shows relative time: "2 days ago", "1 week ago"
export function timeAgo(date: Date | string): string {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  
  return "just now";
}

// Truncates long text and adds "..." — for blog excerpts etc.
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

// Maps difficulty to a color class
export function difficultyColor(difficulty: string): string {
  const map: Record<string, string> = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };
  return map[difficulty] || "bg-gray-100 text-gray-700";
}

// Maps job type to a color class
export function jobTypeColor(type: string): string {
  const map: Record<string, string> = {
    "Full-time": "bg-blue-100 text-blue-700",
    "Part-time": "bg-purple-100 text-purple-700",
    Remote: "bg-teal-100 text-teal-700",
    Hybrid: "bg-orange-100 text-orange-700",
    Contract: "bg-pink-100 text-pink-700",
  };
  return map[type] || "bg-gray-100 text-gray-700";
}
