"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileBottomNavProps {
  whatsappNumber: string;
}

export function MobileBottomNav({ whatsappNumber }: MobileBottomNavProps) {
  const pathname = usePathname();
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hi! I want to order topup service.")}`;

  const navItems = [
    {
      label: "Home",
      href: "/",
      isActive: pathname === "/",
      icon: (active: boolean) => (
        <svg
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.8}
          className="w-5 h-5"
        >
          <path d="M3 10.5 12 3l9 7.5V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9.5Z" />
        </svg>
      ),
    },
    {
      label: "Topups",
      href: "/games",
      isActive: pathname.startsWith("/games"),
      icon: (active: boolean) => (
        <svg
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.8}
          className="w-5 h-5"
        >
          <rect x="2" y="6" width="20" height="12" rx="6" />
          <path d="M6 12h4M8 10v4M15 11h.01M18 12h.01" />
          <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="11" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Order",
      isAction: true,
      href: whatsappUrl,
      isExternal: true,
      icon: (_active?: boolean) => (
        <div className="w-11 h-11 -mt-4 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#4ADE80] shadow-[0_4px_20px_rgba(37,211,102,0.45)] flex items-center justify-center border-2 border-[#0F131C] text-white active:scale-95 transition-transform">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z" />
          </svg>
        </div>
      ),
    },
    {
      label: "Pay",
      href: "/payment-methods",
      isActive: pathname === "/payment-methods",
      icon: (active: boolean) => (
        <svg
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.8}
          className="w-5 h-5"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      ),
    },
    {
      label: "Contact",
      href: "/contact",
      isActive: pathname === "/contact",
      icon: (active: boolean) => (
        <svg
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.8}
          className="w-5 h-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50 bg-[#0B0F19]/95 backdrop-blur-xl border-t border-white/[0.1] px-3 pt-1.5 pb-safe pb-2 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          if (item.isAction) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instant WhatsApp Order"
                className="flex flex-col items-center justify-center -mt-1 group cursor-pointer"
              >
                {item.icon(false)}
                <span className="text-[10px] font-bold text-[#25D366] mt-0.5 tracking-tight group-hover:text-[#4ADE80]">
                  {item.label}
                </span>
              </a>
            );
          }

          const active = !!item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                active
                  ? "text-violet-400 font-bold"
                  : "text-white/50 hover:text-white/80 font-medium"
              }`}
            >
              <div
                className={`transition-transform duration-200 ${
                  active ? "scale-110 drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]" : ""
                }`}
              >
                {item.icon(active)}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${active ? "text-violet-300" : ""}`}>
                {item.label}
              </span>
              {active && (
                <span
                  className="w-1 h-1 rounded-full bg-violet-400 mt-0.5 shadow-[0_0_6px_#A78BFA]"
                  aria-hidden
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
