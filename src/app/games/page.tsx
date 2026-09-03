import { getGames, getSettings } from "@/lib/data";
import { GameGrid } from "@/components/GameCard";

export const revalidate = 3600;
export const metadata = { title: "All Games — ARG Topup" };

export default async function GamesPage() {
  const [games, settings] = await Promise.all([getGames(), getSettings()]);
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#0F131C] via-[#161D2B] to-[#0F131C]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1
            className="font-[var(--font-russo)] text-4xl sm:text-5xl tracking-wide"
            style={{ textShadow: "0 0 30px rgba(124,58,237,0.4)" }}
          >
            ALL GAMES
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-lg mx-auto">
            Tap any game to see packages and buy on WhatsApp — instant delivery.
          </p>
        </div>
        <GameGrid games={games} whatsappNumber={settings.whatsappNumber} />
      </div>
    </div>
  );
}
