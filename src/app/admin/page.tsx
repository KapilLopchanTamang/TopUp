import Link from "next/link";
import { prisma } from "@/lib/db";
import type { Game } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Package, CheckCircle2, Plus } from "lucide-react";
import { AdminGameTable } from "@/components/admin/AdminGameTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let games: Game[] = [];
  try {
    games = (await prisma.game.findMany({
      include: { groups: { include: { rows: true } } },
      orderBy: { sortOrder: "asc" },
    })) as unknown as Game[];
  } catch {
    games = [];
  }

  const activeCount = games.filter((g) => g.isActive).length;
  const totalPackages = games.reduce(
    (acc, g) => acc + g.groups.reduce((rAcc, grp) => rAcc + grp.rows.length, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Services & Games Catalog</h1>
          <p className="text-sm text-white/60">
            Manage your gaming top-ups, app top-ups & subscriptions, pricing tiers, and live availability.
          </p>
        </div>
        <Button render={<Link href="/admin/games/new" />} className="bg-violet-600 hover:bg-violet-500 text-white font-semibold">
          <Plus className="mr-1 size-4" /> Add Service / Game
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-[#0E1220] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Total Services
            </CardTitle>
            <Gamepad2 className="size-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">{games.length}</div>
            <p className="text-xs text-white/40 mt-1">Configured catalog offerings</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0E1220] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Active Storefront Services
            </CardTitle>
            <CheckCircle2 className="size-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">{activeCount}</div>
            <p className="text-xs text-white/40 mt-1">Visible to public buyers</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0E1220] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Total Package Options
            </CardTitle>
            <Package className="size-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">{totalPackages}</div>
            <p className="text-xs text-white/40 mt-1">Across all service tiers</p>
          </CardContent>
        </Card>
      </div>

      {/* Catalog Table */}
      <Card className="bg-[#0E1220] border-white/10 overflow-hidden">
        <CardHeader className="border-b border-white/10 pb-4">
          <CardTitle className="text-base text-white">All Offerings</CardTitle>
          <CardDescription className="text-white/50 text-xs">
            Filter by category (Gaming Top-ups vs Apps Top-ups), search by name, and manage packages.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <AdminGameTable games={games} />
        </CardContent>
      </Card>
    </div>
  );
}

