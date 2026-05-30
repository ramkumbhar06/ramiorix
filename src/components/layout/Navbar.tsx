"use client"; // This component uses browser features (click handlers)

// src/components/layout/Navbar.tsx
// The top navigation bar shown on all public pages

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase, BookOpen, MessageSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation links with their icons
const navLinks = [
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/interview", label: "Interview Prep", icon: MessageSquare },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/fresher", label: "Fresher Guide", icon: Star },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Tells us the current URL

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-display text-xl text-neutral-900">
              Ramiorix
            </span>
          </Link>

          {/* ── Desktop Navigation Links ── */}
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
                      ? "bg-brand-50 text-brand-600"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  )}
                >
                  <link.icon size={15} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA Button ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/jobs" className="btn-primary">
              Browse Jobs
            </Link>
          </div>

          {/* ── Mobile Menu Toggle ── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile Dropdown Menu ── */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-neutral-100 animate-slide-up">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-600"
                      : "text-neutral-600 hover:bg-neutral-50"
                  )}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-neutral-100">
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
