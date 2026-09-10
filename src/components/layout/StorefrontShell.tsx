"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/types";

function IconGamepad(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2" y="6" width="20" height="12" rx="6" />
      <path d="M6 12h4M8 10v4M15 11h.01M18 12h.01" />
      <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z" />
    </svg>
  );
}

import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function StorefrontShell({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  React.useEffect(() => {
    try {
      const clean = () => {
        document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
          el.removeAttribute("bis_skin_checked");
        });
      };
      clean();
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === "attributes" && m.attributeName === "bis_skin_checked" && m.target instanceof Element) {
            m.target.removeAttribute("bis_skin_checked");
          }
        }
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["bis_skin_checked"], subtree: true });
      return () => observer.disconnect();
    } catch {}
  }, []);

  // Admin pages should render cleanly with their own dedicated layout/chrome
  if (isAdmin) {
    return <>{children}</>;
  }

  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`;
  const displayNumber = settings.whatsappNumber.replace(/^977/, "");

  return (
    <div className="min-h-screen bg-[#07090E] text-foreground flex flex-col items-center justify-start antialiased selection:bg-violet-500 selection:text-white relative overflow-x-hidden">
      {/* Ambient background glow for desktop monitors */}
      <div className="fixed inset-0 pointer-events-none hidden sm:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/25 via-[#07090E]/80 to-[#07090E]" />

      {/* Mobile App Container Shell */}
      <div className="w-full max-w-[500px] min-h-screen flex flex-col bg-[#0F131C] sm:border-x sm:border-white/[0.08] sm:shadow-[0_0_80px_rgba(0,0,0,0.85)] relative pb-20">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold z-[100]"
        >
          Skip to content
        </a>

        {/* Promo bar */}
        <div className="relative z-40 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F43F5E] text-white text-center text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase py-2 px-3">
          <span className="inline-flex items-center gap-1.5 line-clamp-1 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" aria-hidden />
            <span className="truncate">{settings.promoBannerText || `Instant Delivery • 100% Secure • WhatsApp ${displayNumber}`}</span>
          </span>
        </div>

        {/* Compact Mobile App Header */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0F131C]/92 border-b border-white/[0.06]">
          <div className="w-full px-3.5 h-[56px] flex items-center justify-between gap-2">
            <Link
              href="/"
              aria-label="All Rounder Gaming Topup home"
              className="flex items-center gap-2.5 cursor-pointer rounded-xl focus-visible:outline-offset-4"
            >
              <div
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#F43F5E] grid place-items-center shadow-[0_0_15px_rgba(124,58,237,0.4)] shrink-0"
                aria-hidden
              >
                <IconGamepad className="w-4 h-4 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-[var(--font-russo)] text-[14px] tracking-wide text-white">ALL ROUNDER</div>
                <div className="text-[9px] tracking-[0.18em] text-violet-400 font-bold -mt-0.5">
                  GAMING TOPUP
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat on WhatsApp ${displayNumber}`}
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5a] active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_12px_rgba(37,211,102,0.3)] transition-all cursor-pointer min-h-[34px]"
              >
                <IconWhatsApp className="w-3.5 h-3.5 shrink-0" aria-hidden />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main" className="flex-1 w-full">
          {children}
        </main>

        {/* Compact Mobile Footer */}
        <footer className="border-t border-white/[0.06] bg-[#07090E] px-4 py-8 text-center text-xs text-white/50 space-y-3">
          <div className="font-[var(--font-russo)] text-sm tracking-wide text-white">
            ALL ROUNDER GAMING TOPUP
          </div>
          <p className="text-[11px] text-white/60 leading-relaxed max-w-[34ch] mx-auto">
            Nepal&apos;s trusted gaming topup store. Fast delivery via WhatsApp. eSewa • Khalti • IME Pay • Bank Transfer.
          </p>
          <div className="pt-2 text-[10px] text-white/40">
            © 2026 All Rounder Gaming Topup • Built for Mobile Gamers
          </div>
        </footer>

        {/* Sticky Mobile Bottom Navigation */}
        <MobileBottomNav whatsappNumber={settings.whatsappNumber} />
      </div>
    </div>
  );
}
