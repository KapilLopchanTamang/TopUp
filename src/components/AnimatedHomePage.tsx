"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameGrid } from "@/components/GameCard";
import Link from "next/link";
import type { Game } from "@/lib/types";

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

interface AnimatedHomePageProps {
  games: Game[];
  whatsappNumber: string;
}

export function AnimatedHomePage({ games, whatsappNumber }: AnimatedHomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const g of games) {
      const cat = g.category || "Gaming Top-ups";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [games]);

  const categoryList = useMemo(() => {
    return Object.keys(categories).sort((a, b) => {
      if (a === "Gaming Top-ups") return -1;
      if (b === "Gaming Top-ups") return 1;
      if (a === "Apps Top-ups") return -1;
      if (b === "Apps Top-ups") return 1;
      return a.localeCompare(b);
    });
  }, [categories]);

  const filteredGames = useMemo(() => {
    if (selectedCategory === "all") return games;
    return games.filter((g) => (g.category || "Gaming Top-ups").toLowerCase() === selectedCategory.toLowerCase());
  }, [games, selectedCategory]);

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi! I want to order topup service.")}`;


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F131C] via-[#161D2B] to-[#0F131C] py-8 sm:py-10 px-4">
        {/* Animated glow orb */}
        <motion.div
          initial={{ opacity: 0.4, scale: 0.95 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#7C3AED]/20 blur-[90px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full text-center">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {/* Top Micro-badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-[11px] font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <span>⚡</span>
              <span>NEPAL&apos;S #1 TOPUP STORE</span>
            </div>

            {/* Hero Headline */}
            <motion.h1
              className="font-[var(--font-russo)] text-3xl sm:text-4xl tracking-wide leading-tight"
              style={{
                textShadow: "0 0 25px rgba(124,58,237,0.4)"
              }}
            >
              <span className="text-white">INSTANT</span>{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F43F5E] bg-clip-text text-transparent">
                TOPUP NEPAL
              </span>
            </motion.h1>

            <motion.p
              className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Free Fire • PUBG • TikTok • eFootball • Subscriptions
            </motion.p>

            {/* Benefit Bullets */}
            <motion.div
              className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {[
                { icon: "⚡", text: "Instant Delivery" },
                { icon: "🔒", text: "100% Secure" },
                { icon: "💰", text: "Best Rates" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80 font-medium"
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Link href="/games" className="block w-full">
                <button
                  type="button"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#F43F5E] text-white font-bold text-sm shadow-[0_4px_25px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                >
                  <span>Browse All Topups</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats 2x2 Grid */}
      <section className="border-y border-white/[0.06] bg-[#0A0D12] py-4 px-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "10K+", sub: "Happy Gamers" },
            { label: "24/7", sub: "Live Support" },
            { label: "5 Min", sub: "Avg Delivery" },
            { label: "100%", sub: "Secure & Verified" }
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
            >
              <div className="text-xl sm:text-2xl font-[var(--font-russo)] bg-gradient-to-r from-[#A78BFA] to-[#F43F5E] bg-clip-text text-transparent">
                {stat.label}
              </div>
              <div className="text-[10px] text-white/50 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Games & Services Grid */}
      <section className="bg-[#0F131C] py-8 px-3.5">
        <div>
          <div className="text-center">
            <h2 className="font-[var(--font-russo)] text-2xl tracking-wide text-white">
              TOPUP SERVICES
            </h2>
            <p className="text-white/60 mt-1.5 text-xs">
              Tap to see package rates & order via WhatsApp
            </p>

            {/* Horizontal Scrollable Category Filter Chips */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-white/[0.04] border-white/10 text-white/70 hover:text-white"
                }`}
              >
                All ({games.length})
              </button>

              {categoryList.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                const isGaming = cat.toLowerCase().includes("game") || cat.toLowerCase().includes("gaming");
                const isApp = cat.toLowerCase().includes("app");

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? isGaming
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-400 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                          : isApp
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                          : "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white"
                        : "bg-white/[0.04] border-white/10 text-white/70 hover:text-white"
                    }`}
                  >
                    <span>{isGaming ? "🎮" : isApp ? "📱" : "✨"}</span>
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-70">({categories[cat]})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <GameGrid games={filteredGames} whatsappNumber={whatsappNumber} />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link href="/games">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Full Catalog ({games.length})
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>


      {/* WhatsApp CTA Section */}
      <section className="bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F43F5E] py-8 px-4 text-center rounded-2xl mx-3 my-6 shadow-[0_8px_30px_rgba(124,58,237,0.3)]">
        <h2 className="font-[var(--font-russo)] text-xl sm:text-2xl text-white">
          READY TO TOPUP?
        </h2>
        <p className="mt-1.5 text-xs text-white/90 max-w-xs mx-auto">
          Order directly via WhatsApp — instant delivery, no signup needed!
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 mt-4 w-full py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] active:scale-95 text-white font-bold text-xs shadow-lg transition-all"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z"/>
          </svg>
          Chat on WhatsApp Now
        </a>
      </section>
    </div>
  );
}
