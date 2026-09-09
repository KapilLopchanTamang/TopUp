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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var origError = console.error;
                  console.error = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var msg = args.map(function(a) { return typeof a === 'string' ? a : (a && a.message ? a.message : ''); }).join(' ');
                    if (msg.indexOf('bis_skin_checked') !== -1) return;
                    origError.apply(console, args);
                  };
                  var o = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(k, v) {
                    if (k === 'bis_skin_checked') return;
                    return o.apply(this, arguments);
                  };
                  function clean(node) {
                    if (node && node.nodeType === 1) {
                      if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                      var els = node.querySelectorAll ? node.querySelectorAll('[bis_skin_checked]') : [];
                      for (var i = 0; i < els.length; i++) els[i].removeAttribute('bis_skin_checked');
                    }
                  }
                  if (typeof MutationObserver !== 'undefined' && document.documentElement) {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                          m.target.removeAttribute('bis_skin_checked');
                        } else if (m.type === 'childList') {
                          for (var j = 0; j < m.addedNodes.length; j++) clean(m.addedNodes[j]);
                        }
                      }
                    });
                    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['bis_skin_checked'], childList: true, subtree: true });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
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
