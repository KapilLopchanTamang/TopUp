import { getGameBySlug, getSettings } from "@/lib/data";
import { PackageTable } from "@/components/PackageTable";
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
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
      <Link href="/games" className="inline-flex items-center gap-1 text-xs font-bold tracking-[0.14em] uppercase text-white/60 hover:text-white transition-colors duration-200 cursor-pointer min-h-[44px]">
        <IconArrowLeft className="w-4 h-4" aria-hidden /> Back to games
      </Link>

      <div className="mt-4 rounded-[24px] overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#7C3AED]/20 via-[#1A1A33] to-[#F43F5E]/10 p-[1px]">
        <div className="rounded-[23px] bg-[#0F0F23] p-5 sm:p-6 flex gap-4 items-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/[0.06] border border-white/10 shrink-0 relative">
            {game.imageUrl ? <Image src={game.imageUrl} alt="" fill className="object-cover" unoptimized /> : null}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-[var(--font-russo)] text-xl sm:text-2xl tracking-wide leading-tight">{game.name}</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">Instant delivery • Pay via eSewa / Khalti / IME Pay / Bank • WhatsApp support</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5a] transition-colors duration-200 cursor-pointer min-h-[36px]">WhatsApp: {settings.whatsappNumber}</a>
              <span className="hidden sm:inline-flex text-xs px-3 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white/70">{game.groups.length} categories • {game.groups.reduce((a, c) => a + c.rows.length, 0)} packs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        {game.groups.map((grp) => (
          <PackageTable key={grp.id} game={game} group={grp} whatsappNumber={settings.whatsappNumber} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 p-4 text-sm text-[#FECDD3] leading-relaxed">
        <span className="font-bold text-white">How it works:</span> Tap <span className="font-bold">Buy</span> → WhatsApp opens with pre-filled order → send payment screenshot → we deliver in minutes. No cart, no login.
      </div>
    </div>
  );
}
