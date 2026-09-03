"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 grid place-items-center" aria-hidden>
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={1.5}>
              <rect x="1" y="5" width="14" height="9" rx="2"/>
              <path d="M4 5V3.5A3.5 3.5 0 0 1 8 0v0a3.5 3.5 0 0 1 4 3.5V5"/>
            </svg>
          </div>
          <div>
            <Link href="/admin" className="font-black text-sm hover:text-[#A78BFA] transition-colors">Admin Dashboard</Link>
            <span className="text-white/30 mx-2">·</span>
            <Link href="/" className="text-xs text-white/50 hover:text-white transition-colors">View Store ↗</Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/games/new"
            className="text-xs font-bold px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            + Add Game
          </Link>
          <Link
            href="/admin/settings"
            className="text-xs font-bold px-4 py-2 rounded-full bg-white/[0.08] border border-white/10 hover:bg-white/[0.12] transition-colors"
          >
            Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-xs font-bold px-4 py-2 rounded-full bg-white hover:bg-white/90 text-black transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}
