"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameCard } from "@/components/GameCard";
import { Search, Gamepad2 } from "lucide-react";
import type { Game } from "@/lib/types";

interface GamesCatalogViewProps {
  games: Game[];
  whatsappNumber: string;
}

export function GamesCatalogView({ games, whatsappNumber }: GamesCatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    return games.filter((g) => {
      const cat = g.category || "Gaming Top-ups";
      const matchesCategory =
        selectedCategory === "all" || cat.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [games, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1
          className="font-[var(--font-russo)] text-2xl sm:text-3xl tracking-wide"
          style={{ textShadow: "0 0 25px rgba(124,58,237,0.4)" }}
        >
          ALL TOPUP SERVICES
        </h1>
        <p className="mt-1 text-white/60 text-xs max-w-sm mx-auto">
          Gaming Top-ups & App Subscriptions • Tap to buy on WhatsApp
        </p>
      </div>

      {/* Controls: Search & Category Tabs */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Free Fire, PUBG, TikTok..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder:text-white/40 outline-none focus:border-violet-500/60 focus:bg-white/[0.08] transition-colors"
          />
        </div>

        {/* Category Tabs: Smooth Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar -mx-1 px-1">
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

      {/* Grid view */}
      {filteredGames.length === 0 ? (
        <div className="py-16 text-center">
          <Gamepad2 className="mx-auto size-10 text-white/20 mb-3" />
          <h3 className="text-base font-bold text-white">No offerings found</h3>
          <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto">
            We couldn&apos;t find any offerings matching &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-2.5 sm:gap-3"
          >
            {filteredGames.map((game) => (
              <GameCard key={game.slug} game={game} whatsappNumber={whatsappNumber} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
