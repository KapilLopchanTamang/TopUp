"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Game, GameGroup, GameRow } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BannerPreviewModal } from "@/components/BannerPreviewModal";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Badge } from "@/components/ui/badge";

interface BannerGameListingProps {
  game: Game;
  whatsappNumber: string;
}

const bannerMap: Record<string, string> = {
  "free-fire": "/images/banners/free-fire-banner.jpg",
  "tiktok": "/images/banners/tiktok-banner.jpg",
  "pubg-mobile": "/images/banners/pubg-banner.jpg",
  "efootball": "/images/banners/efootball-banner.jpg",
};

export function BannerGameListing({ game, whatsappNumber }: BannerGameListingProps) {
  const bannerUrl = bannerMap[game.slug];

  return (
    <div className="space-y-8">
      {/* Header bar with banner view button and live trust pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30">
            ⚡ FAST DELIVERY
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#22C55E]/20 text-[#86EFAC] border border-[#22C55E]/30">
            🔒 100% SECURE
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F59E0B]/20 text-[#FDE68A] border border-[#F59E0B]/30">
            🏷️ BEST PRICE NEPAL
          </span>
        </div>

        {bannerUrl && (
          <BannerPreviewModal bannerUrl={bannerUrl} gameName={game.name} />
        )}
      </div>

      {/* Game Specific Banner-Faithful Listing */}
      {game.slug === "free-fire" && (
        <FreeFireListing game={game} whatsappNumber={whatsappNumber} />
      )}

      {game.slug === "tiktok" && (
        <TikTokListing game={game} whatsappNumber={whatsappNumber} />
      )}

      {game.slug === "pubg-mobile" && (
        <PubgListing game={game} whatsappNumber={whatsappNumber} />
      )}

      {game.slug === "efootball" && (
        <EFootballListing game={game} whatsappNumber={whatsappNumber} />
      )}

      {/* Fallback for other games (Netflix or custom games added via admin) */}
      {!["free-fire", "tiktok", "pubg-mobile", "efootball"].includes(game.slug) && (
        <DefaultGameListing game={game} whatsappNumber={whatsappNumber} />
      )}
    </div>
  );
}

/* =========================================================================
   1. FREE FIRE LISTING (Uses Official Free Fire Diamond Photo)
   ========================================================================= */
function FreeFireListing({ game, whatsappNumber }: { game: Game; whatsappNumber: string }) {
  const diamondGroup = game.groups.find((g) => g.label?.toLowerCase().includes("diamond")) || game.groups[0];
  const membershipGroup = game.groups.find((g) => g.label?.toLowerCase().includes("membership")) || game.groups[1];

  const diamondRows = diamondGroup?.rows || [];
  const membershipRows = membershipGroup?.rows || [];

  // Separate Level Up Pass if present
  const levelUpPass = membershipRows.find((r) => r.amountLabel.toLowerCase().includes("level up")) ||
                      diamondRows.find((r) => r.amountLabel.toLowerCase().includes("level up"));

  const weeklyMem = membershipRows.find((r) => r.amountLabel.toLowerCase().includes("weekly"));
  const monthlyMem = membershipRows.find((r) => r.amountLabel.toLowerCase().includes("monthly"));

  // Diamonds list (excluding pass if it was inside diamonds)
  const diamondsOnly = diamondRows.filter((r) => !r.amountLabel.toLowerCase().includes("level up"));
  
  // Split into 2 columns like the banner (8 in col 1, rest in col 2)
  const col1 = diamondsOnly.slice(0, 8);
  const col2 = diamondsOnly.slice(8);

  return (
    <div className="space-y-6">
      {/* Top Tagline */}
      <div className="text-center space-y-1">
        <div className="inline-block px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-black tracking-widest uppercase">
          100% SECURE INSTANT TOPUP
        </div>
        <h2 className="text-2xl sm:text-3xl font-[var(--font-russo)] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#F43F5E]">
          GET YOUR DIAMONDS HERE
        </h2>
      </div>

      {/* Main Box: DIAMOND TOPUP */}
      <div className="rounded-3xl bg-[#0B0F19] border-2 border-[#7C3AED]/40 shadow-[0_0_40px_rgba(124,58,237,0.15)] p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F43F5E]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Pill with Free Fire Diamond Photo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-[var(--font-russo)] text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            <div className="w-5 h-5 relative shrink-0">
              <Image src="/images/coins/free-fire-diamond.jpeg" alt="Free Fire Diamond" fill className="object-contain" unoptimized />
            </div>
            <span>DIAMOND TOPUP</span>
            <div className="w-5 h-5 relative shrink-0">
              <Image src="/images/coins/free-fire-diamond.jpeg" alt="Free Fire Diamond" fill className="object-contain" unoptimized />
            </div>
          </div>
        </div>

        {/* 2 Column Diamond Table */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Column 1 */}
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-1.5 text-xs font-bold text-white/50 border-b border-white/10 uppercase tracking-wider">
              <span>Diamonds</span>
              <span className="text-right">Price</span>
              <span className="w-16 text-center">Order</span>
            </div>
            {col1.map((row) => (
              <DiamondItemRow
                key={row.id}
                row={row}
                gameName={game.name}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-1.5 text-xs font-bold text-white/50 border-b border-white/10 uppercase tracking-wider">
              <span>Diamonds</span>
              <span className="text-right">Price</span>
              <span className="w-16 text-center">Order</span>
            </div>
            {col2.map((row) => (
              <DiamondItemRow
                key={row.id}
                row={row}
                gameName={game.name}
                whatsappNumber={whatsappNumber}
              />
            ))}

            {/* Level Up Pass Card inside Column 2 (as in banner) */}
            {levelUpPass && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#F59E0B]/20 via-[#B45309]/20 to-black border-2 border-[#F59E0B]/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/50 flex items-center justify-center text-xl shadow-inner">
                    👑
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#FCD34D] uppercase tracking-wider">SPECIAL PASS</div>
                    <div className="text-base font-[var(--font-russo)] text-white">{levelUpPass.amountLabel}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xl font-black text-[#FCD34D] bg-[#F59E0B]/15 px-3 py-1.5 rounded-xl border border-[#F59E0B]/30">
                    Rs. {levelUpPass.price}
                  </div>
                  <a
                    href={buildWhatsAppUrl({
                      whatsappNumber,
                      gameName: game.name,
                      amountLabel: levelUpPass.amountLabel,
                      price: levelUpPass.price,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Buy
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Weekly Membership, Monthly Membership & Trust Card */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Weekly Membership */}
        {weeklyMem && (
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="rounded-2xl bg-[#140C26] border-2 border-[#A855F7]/50 p-5 shadow-[0_0_25px_rgba(168,85,247,0.2)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#A855F7]/20 text-[#D8B4FE] border border-[#A855F7]/40">
                  7 DAYS REWARDS
                </span>
                <span className="text-2xl">⚡</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center font-[var(--font-russo)] text-2xl text-[#C084FC] mb-3">
                W
              </div>
              <h3 className="font-[var(--font-russo)] text-lg text-white">WEEKLY MEMBERSHIP</h3>
              <p className="text-xs text-white/50 mt-1">Daily diamonds + badge perks</p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-2xl font-[var(--font-russo)] text-[#C084FC]">
                Rs. {weeklyMem.price}
              </div>
              <a
                href={buildWhatsAppUrl({
                  whatsappNumber,
                  gameName: game.name,
                  amountLabel: weeklyMem.amountLabel,
                  price: weeklyMem.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold shadow-lg transition-transform"
              >
                Buy Now
              </a>
            </div>
          </motion.div>
        )}

        {/* Monthly Membership */}
        {monthlyMem && (
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="rounded-2xl bg-[#1C1608] border-2 border-[#EAB308]/50 p-5 shadow-[0_0_25px_rgba(234,179,8,0.2)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAB308]/20 text-[#FDE047] border border-[#EAB308]/40">
                  30 DAYS MEGA REWARDS
                </span>
                <span className="text-2xl">🔥</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#EAB308]/20 border border-[#EAB308]/40 flex items-center justify-center font-[var(--font-russo)] text-2xl text-[#FACC15] mb-3">
                M
              </div>
              <h3 className="font-[var(--font-russo)] text-lg text-white">MONTHLY MEMBERSHIP</h3>
              <p className="text-xs text-white/50 mt-1">Massive diamonds & VIP perks</p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-2xl font-[var(--font-russo)] text-[#FACC15]">
                Rs. {monthlyMem.price}
              </div>
              <a
                href={buildWhatsAppUrl({
                  whatsappNumber,
                  gameName: game.name,
                  amountLabel: monthlyMem.amountLabel,
                  price: monthlyMem.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold shadow-lg transition-transform"
              >
                Buy Now
              </a>
            </div>
          </motion.div>
        )}

        {/* Features Guarantee Box */}
        <div className="rounded-2xl bg-gradient-to-br from-[#00E5FF]/10 via-[#0B0F19] to-[#7C3AED]/10 border border-white/10 p-5 flex flex-col justify-center space-y-3 sm:col-span-2 lg:col-span-1">
          <div className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            ARG GUARANTEE
          </div>
          <div className="space-y-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-base">🏷️</span>
              <span className="font-semibold">Best Price Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🛡️</span>
              <span className="font-semibold">100% Trusted Service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">⚡</span>
              <span className="font-semibold">Instant Delivery Service</span>
            </div>
          </div>
          <p className="text-[11px] text-white/40 pt-2 border-t border-white/10">
            Game assets belong to their respective owners. Delivered directly on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

function DiamondItemRow({ row, gameName, whatsappNumber }: { row: GameRow; gameName: string; whatsappNumber: string }) {
  const href = buildWhatsAppUrl({
    whatsappNumber,
    gameName,
    amountLabel: row.amountLabel,
    price: row.price,
  });

  return (
    <div
      className={`grid grid-cols-[1fr_auto_auto] gap-2 items-center px-3 py-2 rounded-xl transition-all ${
        row.isHighlighted
          ? "bg-[#7C3AED]/20 border border-[#7C3AED]/50 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
          : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-5 h-5 relative shrink-0">
          <Image
            src="/images/coins/free-fire-diamond.jpeg"
            alt="Free Fire Diamond"
            fill
            sizes="20px"
            className="object-contain drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]"
            unoptimized
          />
        </div>
        <span className="font-bold text-white text-sm truncate">{row.amountLabel}</span>
        {row.isHighlighted && (
          <Badge className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-[#F43F5E] text-white border-none shrink-0">
            POPULAR
          </Badge>
        )}
      </div>

      <div className="text-right font-[var(--font-russo)] text-[#00E5FF] text-sm pr-2">
        Rs. {row.price}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold text-center transition-colors cursor-pointer"
      >
        Buy
      </a>
    </div>
  );
}

/* =========================================================================
   2. TIKTOK COIN LISTING (Uses Official TikTok Coin Photo)
   ========================================================================= */
function TikTokListing({ game, whatsappNumber }: { game: Game; whatsappNumber: string }) {
  const smallPack = game.groups.find((g) => g.label?.toLowerCase().includes("small")) || game.groups[0];
  const bigPack = game.groups.find((g) => g.label?.toLowerCase().includes("big")) || game.groups[1];

  return (
    <div className="space-y-6">
      {/* Banner Tagline */}
      <div className="text-center space-y-1">
        <p className="text-xs font-semibold text-[#F43F5E] tracking-widest uppercase">
          ✨ Fun Unlimited, Moments Limitless! ✨
        </p>
        <h2 className="text-2xl sm:text-3xl font-[var(--font-russo)] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] via-[#FACC15] to-[#00E5FF]">
          TIKTOK COIN TOP UP CENTER
        </h2>
        <p className="text-xs text-white/60">
          FAST ⚡ • SECURE 🔒 • TRUSTED ✅ • 100% NO BAN RISK
        </p>
      </div>

      {/* Main Container: TIKTOK COIN PRICE LIST */}
      <div className="rounded-3xl bg-[#0F131C] border-2 border-[#F43F5E]/40 shadow-[0_0_40px_rgba(244,63,94,0.15)] p-5 sm:p-7">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#EAB308] text-white font-[var(--font-russo)] text-xs tracking-wider uppercase shadow-md">
            <div className="w-4 h-4 relative shrink-0 rounded-full overflow-hidden">
              <Image src="/images/coins/tiktok-coin.jpeg" alt="TikTok Coin" fill className="object-cover" unoptimized />
            </div>
            <span>TIKTOK COIN PRICE LIST</span>
            <div className="w-4 h-4 relative shrink-0 rounded-full overflow-hidden">
              <Image src="/images/coins/tiktok-coin.jpeg" alt="TikTok Coin" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* SMALL PACK */}
          {smallPack && (
            <div className="rounded-2xl bg-white/[0.02] border border-[#EC4899]/30 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#EC4899] text-white text-xs font-black uppercase">
                      SMALL PACK
                    </span>
                    <span className="text-xs font-bold text-[#F472B6]">★ BEST FOR YOU</span>
                  </div>
                  <span className="text-xs text-white/40">{smallPack.rows.length} tiers</span>
                </div>

                <div className="space-y-2">
                  {smallPack.rows.map((row) => (
                    <TikTokCoinRow
                      key={row.id}
                      row={row}
                      gameName={game.name}
                      whatsappNumber={whatsappNumber}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BIG PACK */}
          {bigPack && (
            <div className="rounded-2xl bg-white/[0.02] border border-[#EAB308]/30 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#EAB308] text-black text-xs font-black uppercase">
                      BIG PACK
                    </span>
                    <span className="text-xs font-bold text-[#FDE047]">★ MORE COINS, MORE FUN</span>
                  </div>
                  <span className="text-xs text-white/40">{bigPack.rows.length} tiers</span>
                </div>

                <div className="space-y-2">
                  {bigPack.rows.map((row) => (
                    <TikTokCoinRow
                      key={row.id}
                      row={row}
                      gameName={game.name}
                      whatsappNumber={whatsappNumber}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Value Badges Footer Bar (From Banner) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">🛡️</div>
          <div className="text-xs font-bold text-white mt-1">100% SECURE</div>
          <div className="text-[10px] text-white/50">No Ban Risk Guaranteed</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">⚡</div>
          <div className="text-xs font-bold text-white mt-1">INSTANT TOP UP</div>
          <div className="text-[10px] text-white/50">Delivered In Seconds</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">🎧</div>
          <div className="text-xs font-bold text-white mt-1">24/7 SUPPORT</div>
          <div className="text-[10px] text-white/50">We Are Always Here</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">👍</div>
          <div className="text-xs font-bold text-white mt-1">HAPPY CUSTOMERS</div>
          <div className="text-[10px] text-white/50">Our Top Priority</div>
        </div>
      </div>
    </div>
  );
}

function TikTokCoinRow({ row, gameName, whatsappNumber }: { row: GameRow; gameName: string; whatsappNumber: string }) {
  const href = buildWhatsAppUrl({
    whatsappNumber,
    gameName,
    amountLabel: row.amountLabel,
    price: row.price,
  });

  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all">
      {/* Official TikTok Coin Photo */}
      <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0 rounded-full overflow-hidden border border-[#FACC15]/40 shadow-sm">
        <Image
          src="/images/coins/tiktok-coin.jpeg"
          alt="TikTok Coin"
          fill
          sizes="24px"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex items-center gap-2 min-w-0">
        <span className="font-bold text-white text-xs sm:text-sm">{row.amountLabel}</span>
        <div className="hidden sm:block flex-1 border-b border-dotted border-white/20 mx-1" />
      </div>
      <div className="text-right font-[var(--font-russo)] text-[#FDE047] text-xs sm:text-sm px-2">
        Rs. {row.price}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 rounded-lg bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold transition-transform cursor-pointer"
      >
        Buy
      </a>
    </div>
  );
}

/* =========================================================================
   3. PUBG MOBILE LISTING (Uses Official PUBG Mobile UC Photo)
   ========================================================================= */
function PubgListing({ game, whatsappNumber }: { game: Game; whatsappNumber: string }) {
  const group = game.groups[0];
  const rows = group?.rows || [];

  return (
    <div className="space-y-6">
      {/* Banner Tagline */}
      <div className="text-center space-y-1">
        <div className="inline-block px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-widest uppercase">
          INSTANT TOP-UP • INSTANT FUN!
        </div>
        <h2 className="text-2xl sm:text-3xl font-[var(--font-russo)] tracking-wide text-white">
          TOP-UP LIKE A PRO! <span className="text-[#FACC15]">PRICE LIST</span>
        </h2>
        <p className="text-xs text-white/60">
          SAFE • FAST • RELIABLE • INSTANT DELIVERY WITHIN MINUTES
        </p>
      </div>

      {/* 2x3 Glowing Cyberpunk Cards Grid with Official PUBG UC Photo */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {rows.map((row) => {
          const href = buildWhatsAppUrl({
            whatsappNumber,
            gameName: game.name,
            amountLabel: row.amountLabel,
            price: row.price,
          });

          return (
            <motion.div
              key={row.id}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-b from-[#141C2E] to-[#0A0E17] border-2 border-[#00E5FF]/40 shadow-[0_0_25px_rgba(0,229,255,0.12)] p-5 flex flex-col justify-between overflow-hidden group hover:border-[#00E5FF] hover:shadow-[0_0_35px_rgba(0,229,255,0.3)]"
            >
              <div className="flex items-center justify-between gap-3">
                {/* Official PUBG UC Metallic Card Image */}
                <div className="w-16 h-12 relative shrink-0 rounded-xl overflow-hidden bg-black/40 border border-[#00E5FF]/40 p-1 flex items-center justify-center shadow-inner">
                  <Image
                    src="/images/coins/pubg-uc-card.png"
                    alt="PUBG Mobile UC"
                    fill
                    sizes="80px"
                    className="object-contain drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                    unoptimized
                  />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">PACKAGE</div>
                  <div className="font-[var(--font-russo)] text-xl sm:text-2xl text-white tracking-wide">
                    {row.amountLabel}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                {/* Yellow Price Badge from Banner */}
                <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#EAB308] text-black font-[var(--font-russo)] text-base sm:text-lg tracking-wide shadow-md">
                  Rs. {row.price}
                </div>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 2a10 10 0 0 0-8.6 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.9 12.1l-.4.7.3 1-1 .3-.7-.4A8 8 0 0 1 12 4Zm-3.2 4.2c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.6.6c-.1.1-.1.3 0 .4.3.6.8 1.1 1.4 1.4.1.1.3.1.4 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v1c0 .3-.2.5-.5.6-1 .2-2.1 0-3.1-.6a8 8 0 0 1-2.3-2.3c-.6-1-.9-2.1-.6-3.1.1-.3.3-.5.6-.5h1Z"/>
                  </svg>
                  Buy
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PUBG Banner Features Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">🚀</div>
          <div className="text-xs font-bold text-white mt-1">INSTANT DELIVERY</div>
          <div className="text-[10px] text-white/50">No Waiting!</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">🛡️</div>
          <div className="text-xs font-bold text-white mt-1">100% SECURE</div>
          <div className="text-[10px] text-white/50">Your Account is Safe</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">🏅</div>
          <div className="text-xs font-bold text-white mt-1">BEST PRICES</div>
          <div className="text-[10px] text-white/50">Cheapest In Nepal</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
          <div className="text-xl">🎧</div>
          <div className="text-xs font-bold text-white mt-1">CUSTOMER SUPPORT</div>
          <div className="text-[10px] text-white/50">We Are Always Here</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. EFOOTBALL LISTING (Uses Official 3-Stacked eFootball Coins Photo)
   ========================================================================= */
function EFootballListing({ game, whatsappNumber }: { game: Game; whatsappNumber: string }) {
  const coinGroup = game.groups.find((g) => g.label?.toLowerCase().includes("coin")) || game.groups[0];
  const specialGroup = game.groups.find((g) => g.label?.toLowerCase().includes("special")) || game.groups[1];

  const coinRows = coinGroup?.rows || [];
  const specialRows = specialGroup?.rows || [];

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="text-center space-y-1">
        <div className="inline-block px-3 py-1 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FDE047] text-xs font-bold tracking-widest uppercase">
          TOP UP. POWER UP. DOMINATE.
        </div>
        <h2 className="text-2xl sm:text-3xl font-[var(--font-russo)] tracking-wide text-white">
          EFOOTBALL COIN TOP UP
        </h2>
        <p className="text-xs text-white/60">
          ⭐⭐⭐⭐⭐ TRUSTED BY THOUSANDS OF PLAYERS
        </p>
      </div>

      {/* Section 1: COIN PRICE LIST with Official eFootball Coins Photo */}
      <div className="rounded-3xl bg-[#0C1222] border-2 border-[#0284C7] shadow-[0_0_40px_rgba(2,132,199,0.2)] p-5 sm:p-7">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white font-[var(--font-russo)] text-sm tracking-wider uppercase shadow-md">
            <div className="w-5 h-5 relative shrink-0 rounded-full overflow-hidden">
              <Image src="/images/coins/efootball-coins.jpg" alt="eFootball Coins" fill className="object-cover" unoptimized />
            </div>
            <span>COIN PRICE LIST</span>
            <div className="w-5 h-5 relative shrink-0 rounded-full overflow-hidden">
              <Image src="/images/coins/efootball-coins.jpg" alt="eFootball Coins" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {coinRows.map((row) => {
            const href = buildWhatsAppUrl({
              whatsappNumber,
              gameName: game.name,
              amountLabel: row.amountLabel,
              price: row.price,
            });

            return (
              <div
                key={row.id}
                className="grid grid-cols-[auto_1fr_auto_auto] gap-2.5 items-center px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-[#0284C7]/30 hover:bg-[#0284C7]/10 transition-all"
              >
                {/* Official eFootball Coins Photo */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 relative shrink-0 rounded-full overflow-hidden border border-[#FACC15]/60 shadow-md bg-black/40">
                  <Image
                    src="/images/coins/efootball-coins.jpg"
                    alt="eFootball Coins"
                    fill
                    sizes="32px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="font-[var(--font-russo)] text-white text-sm">
                  {row.amountLabel}
                </div>

                {/* Yellow Price Badge matching banner */}
                <div className="px-3 py-1 rounded-lg bg-[#FACC15] text-black font-[var(--font-russo)] text-xs sm:text-sm font-black text-center shadow-sm">
                  {row.price} RS
                </div>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Buy
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: SPECIAL PACKS (Suarez Pack & Goal Keeper Pack) */}
      {specialRows.length > 0 && (
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">
              ★ SPECIAL LIMITED PACKS ★
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {specialRows.map((row) => {
              const isSuarez = row.amountLabel.toLowerCase().includes("suarez");
              const href = buildWhatsAppUrl({
                whatsappNumber,
                gameName: game.name,
                amountLabel: row.amountLabel,
                price: row.price,
              });

              return (
                <motion.div
                  key={row.id}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl p-5 border-2 flex items-center justify-between gap-4 shadow-xl ${
                    isSuarez
                      ? "bg-gradient-to-r from-[#581C87]/40 via-[#1E1B4B] to-black border-[#A855F7] shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                      : "bg-gradient-to-r from-[#064E3B]/40 via-[#062925] to-black border-[#22C55E] shadow-[0_0_25px_rgba(34,197,94,0.25)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${
                        isSuarez
                          ? "bg-[#A855F7]/20 border-[#A855F7]/50"
                          : "bg-[#22C55E]/20 border-[#22C55E]/50"
                      }`}
                    >
                      {isSuarez ? "⚽" : "🧤"}
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-black uppercase tracking-wider ${
                          isSuarez ? "text-[#C084FC]" : "text-[#4ADE80]"
                        }`}
                      >
                        FEATURED PACK
                      </div>
                      <div className="font-[var(--font-russo)] text-lg text-white">
                        {row.amountLabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3.5 py-1.5 rounded-xl bg-[#FACC15] text-black font-[var(--font-russo)] text-base font-black shadow-md">
                      {row.price} RS
                    </div>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      Buy
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* eFootball Banner Value Props */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-white/80">
        <span className="flex items-center gap-1.5">⚡ Instant Delivery</span>
        <span className="flex items-center gap-1.5">🔒 100% Secure</span>
        <span className="flex items-center gap-1.5">🏷️ Best Price Guaranteed</span>
        <span className="flex items-center gap-1.5">🤝 Trusted Service</span>
      </div>
    </div>
  );
}

/* =========================================================================
   5. DEFAULT / FALLBACK LISTING (For Netflix or Admin-added Games)
   ========================================================================= */
function DefaultGameListing({ game, whatsappNumber }: { game: Game; whatsappNumber: string }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {game.groups.map((group: GameGroup) => (
        <div
          key={group.id}
          className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-4"
        >
          {group.label && (
            <h3 className="font-[var(--font-russo)] text-lg text-white flex items-center justify-between border-b border-white/10 pb-3">
              <span>{group.label}</span>
              <span className="text-xs font-normal text-white/40">{group.rows.length} packs</span>
            </h3>
          )}

          <div className="space-y-2">
            {group.rows.map((row: GameRow) => {
              const href = buildWhatsAppUrl({
                whatsappNumber,
                gameName: game.name,
                amountLabel: row.amountLabel,
                price: row.price,
              });

              return (
                <div
                  key={row.id}
                  className={`grid grid-cols-[1fr_auto_auto] gap-3 items-center p-3 rounded-xl transition-all ${
                    row.isHighlighted
                      ? "bg-[#7C3AED]/15 border border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                      : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CurrencyIcon gameSlug={game.slug} amountLabel={row.amountLabel} className="w-5 h-5" />
                    <span className="font-semibold text-white truncate text-sm">{row.amountLabel}</span>
                    {row.isHighlighted && (
                      <Badge className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F43F5E] text-white border-none">
                        BEST
                      </Badge>
                    )}
                  </div>

                  <div className="font-bold text-[#A78BFA] text-sm pr-2">
                    Rs. {row.price}
                  </div>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold transition-transform cursor-pointer"
                  >
                    Buy
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
