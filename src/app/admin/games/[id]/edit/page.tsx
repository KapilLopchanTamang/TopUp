import { prisma } from "@/lib/db";
import { updateGame } from "@/lib/actions";
import { GameForm } from "@/components/GameForm";
import { notFound } from "next/navigation";
import type { Game } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let game: Game | null = null;
  try {
    game = (await prisma.game.findUnique({ where: { id }, include: { groups: { include: { rows: { orderBy: { sortOrder: "asc" } } }, orderBy: { sortOrder: "asc" } } } })) as unknown as Game | null;
  } catch {}
  if (!game) notFound();

  const action = updateGame.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-black">Edit {game.name}</h1>
      <div className="mt-6">
        <GameForm initial={game} action={action} />
      </div>
    </div>
  );
}
