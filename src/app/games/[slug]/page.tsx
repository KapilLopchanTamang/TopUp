import { getGameBySlug, getSettings } from "@/lib/data";
import { BannerGameListing } from "@/components/BannerGameListing";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { getGames } = await import("@/lib/data");
  const games = await getGames();
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "Game not found" };
  return {
    title: `${game.name} Top Up Nepal — All Rounder Gaming Topup`,
    description: `Buy ${game.name} cheapest in Nepal. Instant delivery on WhatsApp. From Rs. ${game.groups[0]?.rows[0]?.price || "—"}`,
  };
}

function IconArrowLeft(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}><path d="M15 18 9 12l6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

export default async function GameDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [game, settings] = await Promise.all([getGameBySlug(slug), getSettings()]);
  if (!game) notFound();

  return (
    <div className="w-full px-3 py-4 space-y-4">
      <Link href="/games" className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-violet-300 hover:text-white transition-colors cursor-pointer py-1">
        <IconArrowLeft className="w-4 h-4" aria-hidden /> Back to Topups
      </Link>

      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#7C3AED]/20 via-[#1A1A33] to-[#F43F5E]/10 p-[1px]">
        <div className="rounded-[15px] bg-[#0F0F23] p-3.5 flex gap-3 items-center">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/[0.06] border border-white/10 shrink-0 relative">
            {game.imageUrl ? <Image src={game.imageUrl} alt={game.name} fill sizes="56px" priority className="object-cover" unoptimized /> : null}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-[var(--font-russo)] text-lg tracking-wide leading-tight text-white truncate">{game.name}</h1>
            <p className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Instant WhatsApp Delivery</span>
            </p>
            <div className="mt-2 flex items-center gap-2">
              <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-[#25D366] text-white active:scale-95 transition-all">
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <BannerGameListing game={game} whatsappNumber={settings.whatsappNumber} />
      </div>

      <div className="rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 p-3 text-xs text-[#FECDD3] leading-relaxed">
        <span className="font-bold text-white">How to order:</span> Tap <span className="font-bold text-white">Buy</span> → WhatsApp opens with order details → send payment screenshot → we topup instantly!
      </div>
    </div>
  );
}
