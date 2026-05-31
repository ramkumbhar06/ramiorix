// src/app/admin/layout.tsx

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar — handles both mobile drawer and desktop fixed sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop top bar */}
        <AdminTopBar user={session.user} />

        {/* Page content */}
        {/* pt-14 on mobile = space for the fixed mobile top bar */}
        {/* pb-20 on mobile = space for the fixed bottom nav */}
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-neutral-50 pt-16 md:pt-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}