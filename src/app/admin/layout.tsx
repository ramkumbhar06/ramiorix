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
    redirect("/login"); // redirect to /login, not /admin/login
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar user={session.user} />
        <main className="flex-1 p-6 overflow-auto bg-neutral-50">
          {children}
        </main>
      </div>
    </div>
  );
}