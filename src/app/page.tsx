import { getGames, getSettings } from "@/lib/data";
import { AnimatedHomePage } from "@/components/AnimatedHomePage";

export default async function HomePage() {
  const [games, settings] = await Promise.all([getGames(), getSettings()]);

  return <AnimatedHomePage games={games} whatsappNumber={settings.whatsappNumber} />;
}
