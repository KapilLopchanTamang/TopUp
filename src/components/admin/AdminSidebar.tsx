"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Gamepad2,
  PlusCircle,
  Settings,
  Store,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navItems = [
    { title: "Dashboard & Games", url: "/admin", icon: Gamepad2, active: pathname === "/admin" },
    { title: "Add New Game", url: "/admin/games/new", icon: PlusCircle, active: pathname === "/admin/games/new" },
    { title: "Site Settings", url: "/admin/settings", icon: Settings, active: pathname === "/admin/settings" },
  ];

  return (
    <Sidebar className="border-r border-white/10 bg-[#0A0D12]" {...props}>
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-rose-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <ShieldCheck className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-white">ARG TOPUP</span>
            <span className="text-[11px] text-white/50 font-medium">Admin Control Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-[11px] font-semibold uppercase tracking-wider px-2">
            Catalog Management
          </SidebarGroupLabel>
          <SidebarMenu className="mt-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={item.active}
                    className="hover:bg-white/[0.08] text-white/70 hover:text-white data-[active=true]:bg-violet-600/20 data-[active=true]:text-violet-300 data-[active=true]:font-semibold rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <Icon className="size-4 text-violet-400" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-white/40 text-[11px] font-semibold uppercase tracking-wider px-2">
            Quick Navigation
          </SidebarGroupLabel>
          <SidebarMenu className="mt-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/" target="_blank" />}
                className="hover:bg-white/[0.08] text-white/60 hover:text-white rounded-lg px-3 py-2 text-sm transition-colors"
              >
                <Store className="size-4 text-cyan-400" />
                <span>View Storefront ↗</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/15 hover:text-rose-200 transition-colors cursor-pointer border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="size-4 text-rose-400" />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
