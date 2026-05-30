"use client";

// src/components/admin/AdminSidebar.tsx
// The left sidebar shown on all admin pages

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  MessageSquare,
  Tag,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/questions", label: "Interview Q&A", icon: MessageSquare },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-neutral-950 border-r border-neutral-800 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-neutral-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
          <span className="font-display text-lg text-white">Ramiorix</span>
        </Link>
        <p className="text-neutral-600 text-xs mt-1 ml-9">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          // Highlight active link
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="p-3 border-t border-neutral-800">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-neutral-300 text-xs transition-colors"
        >
          <ExternalLink size={13} />
          View Live Site
        </a>
      </div>
    </aside>
  );
}
