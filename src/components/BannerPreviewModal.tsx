"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BannerPreviewModalProps {
  bannerUrl: string;
  gameName: string;
}

export function BannerPreviewModal({ bannerUrl, gameName }: BannerPreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED]/20 to-[#F43F5E]/20 hover:from-[#7C3AED]/30 hover:to-[#F43F5E]/30 border border-[#A78BFA]/30 text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.15)]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#A78BFA]">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span>View Official Banner</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[92vh] max-w-[95vw] sm:max-w-[580px] w-full bg-[#0F131C] border border-white/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#161D2B]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <h3 className="font-bold text-sm text-white">{gameName} Promo Poster</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Banner Image Container */}
              <div className="relative overflow-y-auto max-h-[calc(92vh-100px)] p-3 flex items-center justify-center bg-black/50">
                <div className="relative w-full max-w-[500px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={bannerUrl}
                    alt={`${gameName} Promotional Price List`}
                    fill
                    sizes="(max-width: 640px) 95vw, 500px"
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/10 bg-[#161D2B] flex items-center justify-between text-xs text-white/60">
                <span>Verified ARG Gaming Topup Pricing</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
