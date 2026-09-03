"use client";
import { motion } from "framer-motion";
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
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi! I want to order gaming topup.")}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F131C] via-[#161D2B] to-[#0F131C]">
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
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Hero Headline */}
            <motion.h1
              className="font-[var(--font-russo)] text-4xl sm:text-5xl lg:text-6xl tracking-wide leading-tight"
              style={{
                textShadow: "0 0 30px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.2)"
              }}
            >
              <span className="text-white">INSTANT</span>{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F43F5E] bg-clip-text text-transparent">
                GAMING TOPUP
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Free Fire • PUBG • TikTok • eFootball — Fast delivery, best prices in Nepal
            </motion.p>

            {/* Benefit Bullets */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {[
                { icon: "⚡", text: "Instant Delivery" },
                { icon: "🔒", text: "100% Secure" },
                { icon: "💰", text: "Best Price" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10"
                  whileHover={{ scale: 1.05, borderColor: "rgba(124,58,237,0.3)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <span className="text-white/80 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link href="/games">
                <motion.button
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#F43F5E] text-white font-bold text-lg shadow-[0_0_40px_rgba(124,58,237,0.4)] min-h-[56px]"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 60px rgba(124,58,237,0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Browse All Games
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* CRT scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} aria-hidden="true" />
      </section>

      {/* Trust Badges */}
      <section className="border-y border-white/[0.06] bg-[#0A0D12]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "10K+", sub: "Happy Gamers" },
              { label: "24/7", sub: "Support" },
              { label: "5 Min", sub: "Avg Delivery" },
              { label: "100%", sub: "Secure" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-3xl sm:text-4xl font-[var(--font-russo)] bg-gradient-to-r from-[#A78BFA] to-[#F43F5E] bg-clip-text text-transparent">
                  {stat.label}
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="bg-[#0F131C] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[var(--font-russo)] text-3xl sm:text-4xl tracking-wide text-center">
              POPULAR GAMES
            </h2>
            <p className="text-center text-white/60 mt-3 text-sm sm:text-base">
              Tap any game to see packages and order via WhatsApp
            </p>
          </motion.div>

          <div className="mt-10">
            <GameGrid games={games} whatsappNumber={whatsappNumber} />
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
                View All Games
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F43F5E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[var(--font-russo)] text-3xl sm:text-4xl text-white">
              READY TO TOPUP?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Order directly via WhatsApp — no signup, no payment gateway. Just send your order and we&apos;ll deliver instantly!
            </p>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)] min-h-[56px]"
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z"/>
              </svg>
              Chat on WhatsApp Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
