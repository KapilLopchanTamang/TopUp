import { getGames, getSettings } from "@/lib/data";
import { GamesCatalogView } from "@/components/GamesCatalogView";

export const revalidate = 3600;
export const metadata = { title: "Services & Games — ARG Topup" };

export default async function GamesPage() {
  const [games, settings] = await Promise.all([getGames(), getSettings()]);
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#0F131C] via-[#161D2B] to-[#0F131C]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <GamesCatalogView games={games} whatsappNumber={settings.whatsappNumber} />
      </div>
    </div>
  );
}

