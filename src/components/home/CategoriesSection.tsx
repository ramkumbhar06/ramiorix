// src/components/home/CategoriesSection.tsx
// Shows job/content categories on the home page

import Link from "next/link";
import {
  Code2,
  BarChart3,
  Users,
  Database,
  Building2,
  Globe,
  Zap,
  Heart,
} from "lucide-react";

// Static categories — you can make this dynamic from the DB later
const categories = [
  { icon: Code2, label: "Software Dev", count: "2,400+", href: "/jobs?category=software", color: "bg-blue-50 text-blue-600" },
  { icon: BarChart3, label: "Data Analyst", count: "890+", href: "/jobs?category=data-analyst", color: "bg-purple-50 text-purple-600" },
  { icon: Users, label: "HR & Recruitment", count: "650+", href: "/jobs?category=hr", color: "bg-pink-50 text-pink-600" },
  { icon: Database, label: "SQL & Database", count: "480+", href: "/jobs?category=sql", color: "bg-orange-50 text-orange-600" },
  { icon: Building2, label: "US Mortgage", count: "320+", href: "/jobs?category=mortgage", color: "bg-teal-50 text-teal-600" },
  { icon: Globe, label: "Remote Jobs", count: "1,100+", href: "/jobs?type=remote", color: "bg-green-50 text-green-600" },
  { icon: Zap, label: "Fresher Jobs", count: "740+", href: "/jobs?experience=fresher", color: "bg-yellow-50 text-yellow-600" },
  { icon: Heart, label: "Non-profit", count: "180+", href: "/jobs?category=nonprofit", color: "bg-red-50 text-red-600" },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">Browse by Category</h2>
          <p className="section-sub">
            Explore opportunities across industries and specializations
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="card p-5 flex flex-col items-start gap-3 group no-underline"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                <cat.icon size={20} />
              </div>

              {/* Label & Count */}
              <div>
                <div className="font-medium text-neutral-800 text-sm group-hover:text-brand-600 transition-colors">
                  {cat.label}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {cat.count} jobs
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
