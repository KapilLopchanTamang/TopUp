"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Gamepad2, PlusCircle, Settings, Store, LogOut } from "lucide-react";

export function AdminMobileBottomNav() {
  const pathname = usePathname();

  // If on login page, don't show admin bottom navigation
  if (pathname === "/admin/login") return null;

  const isDashboard = pathname === "/admin";
  const isNewGame = pathname === "/admin/games/new";
  const isSettings = pathname === "/admin/settings";

  return (
    <nav
      aria-label="Admin Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#0A0D14]/95 backdrop-blur-xl border-t border-white/[0.1] px-2 pt-1 pb-safe pb-2 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* Dashboard */}
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[56px] min-h-[44px] ${
            isDashboard ? "text-violet-400 font-bold" : "text-white/60 hover:text-white"
          }`}
        >
          <Gamepad2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Catalog</span>
        </Link>

        {/* Add New Game (Elevated Action) */}
        <Link
          href="/admin/games/new"
          className="flex flex-col items-center justify-center -mt-3 group cursor-pointer"
          aria-label="Add New Service"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-[0_4px_16px_rgba(124,58,237,0.5)] flex items-center justify-center border-2 border-[#0A0D14] text-white active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className={`text-[10px] font-bold mt-0.5 tracking-tight ${isNewGame ? "text-violet-300" : "text-white/70"}`}>
            + Add
          </span>
        </Link>

        {/* Settings */}
        <Link
          href="/admin/settings"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[56px] min-h-[44px] ${
            isSettings ? "text-violet-400 font-bold" : "text-white/60 hover:text-white"
          }`}
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Settings</span>
        </Link>

        {/* Storefront */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-white/60 hover:text-white transition-colors min-w-[56px] min-h-[44px]"
        >
          <Store className="w-5 h-5 mb-0.5 text-cyan-400" />
          <span className="text-[10px] tracking-tight">Store ↗</span>
        </Link>

        {/* Sign Out */}
        <button
          type="button"
          onClick={() => {
            if (confirm("Are you sure you want to sign out of Admin?")) {
              signOut({ callbackUrl: "/admin/login" });
            }
          }}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-rose-400/80 hover:text-rose-300 transition-colors min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <LogOut className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Sign Out</span>
        </button>
      </div>
    </nav>
  );
}
