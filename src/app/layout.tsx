import type { Metadata, Viewport } from "next";
import { Russo_One, Chakra_Petch, Geist } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/data";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const russo = Russo_One({ weight: "400", subsets: ["latin"], variable: "--font-russo", display: "swap" });
const chakra = Chakra_Petch({ weight: ["300","400","500","600","700"], subsets: ["latin"], variable: "--font-chakra", display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0F131C" };

export const metadata: Metadata = {
  title: "All Rounder Gaming Topup — Instant Diamond, UC & Coin Topup Nepal",
  description: "Fast, secure gaming topup in Nepal. Free Fire diamonds, PUBG UC, TikTok Coins, eFootball Coins. Buy on WhatsApp — instant delivery.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://arg-topup.vercel.app"),
  openGraph: { title: "All Rounder Gaming Topup", description: "Instant gaming topup Nepal", type: "website" },
};

import { StorefrontShell } from "@/components/layout/StorefrontShell";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn("dark antialiased", russo.variable, chakra.variable, "font-sans", geist.variable)}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground flex flex-col font-[var(--font-chakra)]"
      >
        <StorefrontShell settings={settings}>
          {children}
        </StorefrontShell>
      </body>
    </html>
  );
}
