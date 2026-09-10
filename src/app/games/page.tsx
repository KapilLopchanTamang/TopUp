import { getGames, getSettings } from "@/lib/data";
import { GamesCatalogView } from "@/components/GamesCatalogView";

export const revalidate = 3600;
export const metadata = { title: "Services & Games — ARG Topup" };

export default async function GamesPage() {
  const [games, settings] = await Promise.all([getGames(), getSettings()]);
  return (
    <div className="min-h-[80vh] w-full px-3.5 py-6">
      <GamesCatalogView games={games} whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}

