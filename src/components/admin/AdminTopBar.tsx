"use client";

// src/components/admin/AdminTopBar.tsx
// Responsive top bar — hidden on mobile (replaced by hamburger in sidebar)

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type Props = {
  user?: { name?: string | null; email?: string | null; image?: string | null };
};

export default function AdminTopBar({ user }: Props) {
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AD";

  return (
    // Hidden on mobile — the AdminSidebar handles the mobile top bar
    <header className="hidden md:flex bg-white border-b border-neutral-200 px-6 py-3 items-center justify-between">
      <div />

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Avatar + name */}
        <div className="flex items-center gap-2.5">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "Admin"}
              className="w-8 h-8 rounded-full border border-neutral-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 text-xs font-semibold flex items-center justify-center">
              {initials}
            </div>
          )}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-neutral-800 leading-none">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">{user?.email}</p>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors border border-neutral-200"
        >
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </header>
  );
}