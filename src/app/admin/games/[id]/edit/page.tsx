import { prisma } from "@/lib/db";
import { updateGame } from "@/lib/actions";
import { GameForm } from "@/components/GameForm";
import { DeleteGameButton } from "@/components/admin/DeleteGameButton";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white">Edit {game.name}</h1>
          <p className="text-xs text-white/50 mt-1">Update game details, pricing tiers, and photo.</p>
        </div>
        <DeleteGameButton id={game.id} name={game.name} redirectTo="/admin" />
      </div>
      <div>
        <GameForm initial={game} action={action} />
      </div>
    </div>
  );
}
