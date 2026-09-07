"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If rendering the login screen, do not show admin sidebar shell
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#0F131C]">{children}</div>;
  }

  const pageTitle =
    pathname === "/admin"
      ? "Dashboard"
      : pathname === "/admin/games/new"
      ? "Create Game"
      : pathname.includes("/edit")
      ? "Edit Game"
      : pathname === "/admin/settings"
      ? "Site Settings"
      : "Admin";

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#0F131C] text-[#E2E8F0]">
        <AdminSidebar />
        <SidebarInset className="flex flex-1 flex-col bg-[#0F131C]">
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4 bg-[#0A0D12]/60 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-white/70 hover:text-white" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-white/10" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="/admin" />} className="text-white/50 hover:text-white">
                      Admin
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-white/30" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white font-medium">{pageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="text-xs text-white/60 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/[0.06] transition-colors"
              >
                <span>Storefront</span>
                <span className="text-white/40">↗</span>
              </Link>
              {pathname !== "/admin" && pathname !== "/admin/games/new" && (
                <Link
                  href="/admin/games/new"
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                >
                  + New Game
                </Link>
              )}
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
