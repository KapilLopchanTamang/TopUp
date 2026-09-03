"use client";
import { motion } from "framer-motion";
import type { GameGroup, Game, GameRow } from "@/lib/types";

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 }
  })
};

export function PackageTable({ game, group, whatsappNumber }: { game: Game; group: GameGroup; whatsappNumber: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-[var(--surface-3)] border border-white/[0.06] p-5"
    >
      {group.label && (
        <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
          {group.label}
          <span className="text-xs font-normal text-white/40">({group.rows.length})</span>
        </h2>
      )}

      <div className="space-y-2">
        {group.rows.map((row: GameRow, i: number) => {
          const msg = `Hi! I want to order:\n${game.name} – ${row.amountLabel}\nPrice: Rs. ${row.price}\n\nPlease confirm.`;
          const href = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

          return (
            <motion.div
              key={row.id}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className={`grid grid-cols-[1fr_auto_auto] gap-3 items-center p-3 rounded-xl transition-all duration-200 ${
                row.isHighlighted
                  ? "bg-[#7C3AED]/10 border border-[#7C3AED]/30 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                  : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-white truncate">{row.amountLabel}</span>
                {row.isHighlighted && (
                  <span className="shrink-0 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#F43F5E] text-white">
                    BEST
                  </span>
                )}
              </div>

              <div className="text-right">
                <div className="font-bold text-[#A78BFA]">Rs. {row.price}</div>
              </div>

              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold min-h-[40px] min-w-[80px] cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z"/>
                </svg>
                Buy
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
