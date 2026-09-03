import type { Metadata, Viewport } from "next";
import { Russo_One, Chakra_Petch } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getSettings } from "@/lib/data";

const russo = Russo_One({ weight: "400", subsets: ["latin"], variable: "--font-russo", display: "swap" });
const chakra = Chakra_Petch({ weight: ["300","400","500","600","700"], subsets: ["latin"], variable: "--font-chakra", display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0F131C" };

export const metadata: Metadata = {
  title: "All Rounder Gaming Topup — Instant Diamond, UC & Coin Topup Nepal",
  description: "Fast, secure gaming topup in Nepal. Free Fire diamonds, PUBG UC, TikTok Coins, eFootball Coins. Buy on WhatsApp — instant delivery.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://arg-topup.vercel.app"),
  openGraph: { title: "All Rounder Gaming Topup", description: "Instant gaming topup Nepal", type: "website" },
};

function IconGamepad(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2" y="6" width="20" height="12" rx="6"/>
      <path d="M6 12h4M8 10v4M15 11h.01M18 12h.01"/>
      <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="11" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z"/>
    </svg>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`;
  const displayNumber = settings.whatsappNumber.replace(/^977/, "");

  return (
    <html lang="en" suppressHydrationWarning className={`${russo.variable} ${chakra.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-[#0F131C] text-[#E2E8F0] flex flex-col font-[var(--font-chakra)]">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold z-[100]">
          Skip to content
        </a>

        {/* Promo bar */}
        <div className="relative z-40 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F43F5E] text-white text-center text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase py-2.5 px-4">
          <span className="inline-flex items-center gap-2">
            <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden />
            Instant Delivery • 100% Secure • Best Price Guaranteed — WhatsApp {displayNumber}
          </span>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0F131C]/85 border-b border-white/[0.06]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
            <Link href="/" aria-label="All Rounder Gaming Topup home" className="flex items-center gap-3 cursor-pointer rounded-xl focus-visible:outline-offset-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#F43F5E] grid place-items-center shadow-[0_0_20px_rgba(124,58,237,0.4)]" aria-hidden>
                <IconGamepad className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-[var(--font-russo)] text-[15px] tracking-wide">ALL ROUNDER</div>
                <div className="text-[10px] tracking-[0.18em] text-white/60 -mt-0.5 font-semibold">GAMING TOPUP</div>
              </div>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-1 text-sm">
              <Link href="/games" className="px-4 py-2 rounded-full hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200 cursor-pointer font-medium">Games</Link>
              <Link href="/payment-methods" className="px-4 py-2 rounded-full hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200 cursor-pointer font-medium">Payment</Link>
              <Link href="/contact" className="px-4 py-2 rounded-full hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200 cursor-pointer font-medium">Contact</Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/games" className="hidden sm:inline-flex md:hidden px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm font-semibold cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500">Games</Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat on WhatsApp ${displayNumber}`}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] active:bg-[#128C7E] focus-visible:ring-2 focus-visible:ring-[#25D366] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer min-h-[44px]"
              >
                <IconWhatsApp className="w-4 h-4" aria-hidden />
                <span className="hidden sm:inline">Buy on WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>
          </div>
        </header>

        <main id="main" className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] bg-[#05070C]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <div className="font-[var(--font-russo)] text-sm tracking-wide">ALL ROUNDER GAMING TOPUP</div>
                <p className="text-sm text-white/60 mt-2 leading-relaxed max-w-[32ch]">
                  Nepal&apos;s trusted gaming topup store. Fast delivery via WhatsApp. eSewa • Khalti • IME Pay • Bank Transfer.
                </p>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Explore</div>
                <div className="mt-3 flex flex-col gap-2 text-sm text-white/60">
                  <Link href="/games" className="hover:text-white transition-colors duration-200 cursor-pointer w-fit">All Games</Link>
                  <Link href="/payment-methods" className="hover:text-white transition-colors duration-200 cursor-pointer w-fit">Payment Methods</Link>
                  <Link href="/contact" className="hover:text-white transition-colors duration-200 cursor-pointer w-fit">Contact</Link>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Connect</div>
                <div className="mt-3 flex flex-col gap-2 text-sm text-white/60">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer w-fit">WhatsApp: {displayNumber}</a>
                  {settings.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer w-fit">Facebook Page</a>}
                  {settings.messengerUrl && <a href={settings.messengerUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 cursor-pointer w-fit">Messenger</a>}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs text-white/40 flex flex-col sm:flex-row gap-2 justify-between">
              <span>© {new Date().getFullYear()} All Rounder Gaming Topup. Game assets belong to their respective owners.</span>
              <span>Built for mobile gamers in Nepal</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
