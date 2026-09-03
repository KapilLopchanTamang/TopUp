import { prisma } from "@/lib/db";
import { deleteGame } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let games: Game[] = [];
  try {
    games = (await prisma.game.findMany({ include: { groups: { include: { rows: true } } }, orderBy: { sortOrder: "asc" } })) as unknown as Game[];
  } catch {
    games = [];
  }

  return (
    <div>
      <h1 className="text-xl font-black">Games ({games.length})</h1>
      <p className="text-sm text-white/60">Manage packages, prices, and visibility.</p>

      <div className="mt-6 grid gap-3">
        {games.length === 0 && <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-8 text-center text-white/60">No games yet. Seed the DB or add one.</div>}
        {games.map((g) => (
          <div key={g.id} className="rounded-2xl bg-[#0E1220] border border-white/[0.06] p-4 flex items-center justify-between gap-4">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden grid place-items-center text-xs relative">
                {g.imageUrl ? <Image src={g.imageUrl} alt={g.name} fill className="object-cover" unoptimized /> : "🎮"}
              </div>
              <div>
                <div className="font-bold text-sm">{g.name} <span className="text-white/40 font-mono text-xs">/{g.slug}</span> {g.isActive ? <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Active</span> : <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10">Hidden</span>}</div>
                <div className="text-xs text-white/50">{g.groups.length} groups • {g.groups.reduce((a, c) => a + c.rows.length, 0)} packs</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/games/${g.id}/edit`} className="text-xs font-bold px-4 py-2 rounded-full bg-white text-black">Edit</Link>
              <form action={deleteGame.bind(null, g.id)}>
                <button className="text-xs font-bold px-4 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/20">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
