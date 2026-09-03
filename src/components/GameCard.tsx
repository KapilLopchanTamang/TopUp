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

export function GameCard({ game, whatsappNumber }: GameCardProps) {
  const href = `/games/${game.slug}`;
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const whatsapp = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Hi! I want to buy ${game.name} topup.`)}`;

  return (
    <motion.div variants={item} className="group rounded-2xl bg-[var(--surface-3)] border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
      <Link
        href={href}
        className="block focus-visible:outline-offset-4"
      >
        <motion.div
          className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#1E2636] to-[#0F131C]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {game.imageUrl && (
            <Image
              src={game.imageUrl}
              alt={game.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F131C] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }} />
        </motion.div>

        <div className="p-5 pb-2">
          <h3 className="font-[var(--font-russo)] text-lg tracking-wide text-white group-hover:text-[#A78BFA] transition-colors duration-200">
            {game.name}
          </h3>
          <p className="text-xs text-white/50 mt-2 line-clamp-2">
            Instant delivery • Secure payment • Best price in Nepal
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 pt-2 flex items-center gap-2">
        <Link
          href={href}
          className="flex-1 text-center py-2.5 px-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-xs font-bold text-[#A78BFA] hover:bg-[#7C3AED]/15 hover:border-[#7C3AED]/50 transition-colors duration-200"
        >
          View Prices
        </Link>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold min-h-[44px] flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z"/>
          </svg>
          Buy
        </a>
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
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {games.map((game) => (
        <GameCard key={game.slug} game={game} whatsappNumber={whatsappNumber} />
      ))}
    </motion.div>
  );
}
