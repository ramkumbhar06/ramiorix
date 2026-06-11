"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, BookOpen, MessageSquare, Tag, ExternalLink, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/questions", label: "Interview Q&A", icon: MessageSquare },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

// Logo component using font — consistent with navbar and footer
function SidebarLogo({ dark = true }: { dark?: boolean }) {
  return (
    <span
      className="font-logo text-2xl tracking-tight"
      style={{ color: dark ? "#ffffff" : "#05277e" }}
    >
      Ramiorix
    </span>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-4 py-3">
        <Link href="/admin">
          <SidebarLogo />
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-neutral-950 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-5 border-b border-neutral-800 flex items-center justify-between">
              <Link href="/admin" onClick={() => setMobileOpen(false)}>
                <SidebarLogo />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors">
                <X size={16} />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-0.5">
              {navItems.map((item) => {
                const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className={cn("flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive ? "bg-brand-500 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    )}>
                    <item.icon size={17} />{item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-neutral-800">
              <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-neutral-300 text-xs transition-colors">
                <ExternalLink size={13} />View Live Site
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 bg-neutral-950 border-r border-neutral-800 flex-col shrink-0 sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-neutral-800">
          <Link href="/admin"><SidebarLogo /></Link>
          <p className="text-neutral-600 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={cn("flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive ? "bg-brand-500 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                )}>
                <item.icon size={16} />{item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-neutral-800">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-neutral-300 text-xs transition-colors">
            <ExternalLink size={13} />View Live Site
          </a>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950 border-t border-neutral-800 flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={cn("flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                isActive ? "text-brand-400" : "text-neutral-500"
              )}>
              <item.icon size={19} />
              <span className="text-[9px] font-medium leading-none">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}