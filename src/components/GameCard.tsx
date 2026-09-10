"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeInOut" as const }
  }
};

interface GameCardProps {
  game: Game;
  whatsappNumber: string;
}

export function GameCard({ game }: GameCardProps) {
  const href = `/games/${game.slug}`;
  const isApp = (game.category || "").toLowerCase().includes("app");

  return (
    <motion.div
      variants={item}
      className="group rounded-2xl bg-[#141A28] border border-white/[0.08] overflow-hidden transition-all duration-200 hover:border-violet-500/50 hover:shadow-[0_4px_20px_rgba(124,58,237,0.2)] flex flex-col justify-between"
    >
      <Link href={href} className="block focus-visible:outline-offset-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0D14]">
          {game.imageUrl && (
            <Image
              src={game.imageUrl}
              alt={game.name}
              fill
              sizes="(max-width: 500px) 50vw, 250px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          )}

          {/* Category Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md border flex items-center gap-1 shadow-md ${
                isApp
                  ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                  : "bg-violet-950/80 border-violet-500/40 text-violet-300"
              }`}
            >
              <span>{isApp ? "📱" : "🎮"}</span>
              <span>{isApp ? "App" : "Game"}</span>
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#141A28] via-transparent to-transparent opacity-80" />
        </div>

        <div className="p-3 pb-1.5">
          <h3 className="font-[var(--font-russo)] text-[13px] sm:text-sm tracking-wide text-white group-hover:text-violet-300 transition-colors truncate">
            {game.name}
          </h3>
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Instant Topup</span>
          </div>
        </div>
      </Link>

      <div className="p-2.5 pt-1">
        <Link
          href={href}
          className="w-full py-2 px-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 active:scale-95 text-violet-200 text-xs font-bold text-center flex items-center justify-center gap-1 transition-all min-h-[36px]"
        >
          <span>View Rates</span>
          <span className="text-[11px] text-violet-400">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

interface GameGridProps {
  games: Game[];
  whatsappNumber: string;
}

export function GameGrid({ games, whatsappNumber }: GameGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-2.5 sm:gap-3"
    >
      {games.map((game) => (
        <GameCard key={game.slug} game={game} whatsappNumber={whatsappNumber} />
      ))}
    </motion.div>
  );
}
