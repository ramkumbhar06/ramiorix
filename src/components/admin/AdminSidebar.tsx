"use client";

// src/components/admin/AdminSidebar.tsx
// Responsive sidebar — collapses to bottom nav on mobile, side drawer on tablet+

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, BookOpen,
  MessageSquare, Tag, ExternalLink, X, Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/questions", label: "Interview Q&A", icon: MessageSquare },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── MOBILE TOP BAR (shown only on small screens) ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
          <span className="font-display text-lg text-white">Ramiorix</span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          {/* Drawer panel */}
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-neutral-950 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-5 border-b border-neutral-800 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <span className="font-display text-lg text-white">Ramiorix</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-0.5">
              {navItems.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-brand-500 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    )}
                  >
                    <item.icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
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
          </div>
        </div>
      )}

      {/* ── DESKTOP SIDEBAR (hidden on mobile) ── */}
      <aside className="hidden md:flex w-56 bg-neutral-950 border-r border-neutral-800 flex-col shrink-0 sticky top-0 h-screen">
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

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
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

        {/* Footer */}
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

      {/* ── MOBILE BOTTOM NAV (quick access icons) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950 border-t border-neutral-800 flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                isActive ? "text-brand-400" : "text-neutral-500"
              )}
            >
              <item.icon size={19} />
              <span className="text-[9px] font-medium leading-none">
                {item.label.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}