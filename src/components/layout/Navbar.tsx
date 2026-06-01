"use client";

// src/components/layout/Navbar.tsx
// Public navbar with dark/light toggle, premium font, loading feedback

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase, BookOpen, MessageSquare, Star, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/interview", label: "Interview Prep", icon: MessageSquare },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/fresher", label: "Fresher Guide", icon: Star },
];

// Dark/Light toggle button
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200"
    >
      <Sun size={16} className="hidden dark:block" />
      <Moon size={16} className="block dark:hidden" />
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 transition-colors duration-300">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm tracking-tight">R</span>
            </div>
            <span className="font-display text-xl text-neutral-900 dark:text-white tracking-tight">
              Ramiorix
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  )}
                >
                  <link.icon size={15} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="/jobs" className="btn-primary text-sm">
              Browse Jobs
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-neutral-100 dark:border-neutral-800 animate-slide-up">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  )}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800">
              <Link
                href="/jobs"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary block text-center"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}