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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Services & Games Catalog</h1>
          <p className="text-xs sm:text-sm text-white/60 mt-0.5">
            Manage your gaming top-ups, app top-ups, packages, pricing, and live availability.
          </p>
        </div>
        <Button render={<Link href="/admin/games/new" />} className="bg-violet-600 hover:bg-violet-500 text-white font-semibold w-full sm:w-auto h-10 min-h-[40px]">
          <Plus className="mr-1 size-4" /> Add Service / Game
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
        <Card className="bg-[#0E1220] border-white/10 p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-1.5">
            <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50">
              Total Services
            </CardTitle>
            <Gamepad2 className="size-4 text-violet-400 shrink-0" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl sm:text-2xl font-black text-white">{games.length}</div>
            <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">Catalog offerings</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0E1220] border-white/10 p-3 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-1.5">
            <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50">
              Active on Store
            </CardTitle>
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{activeCount}</div>
            <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">Visible to buyers</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0E1220] border-white/10 p-3 sm:p-4 col-span-2 sm:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-1.5">
            <CardTitle className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50">
              Total Packages
            </CardTitle>
            <Package className="size-4 text-cyan-400 shrink-0" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-xl sm:text-2xl font-black text-cyan-400">{totalPackages}</div>
            <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">Across all tiers</p>
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

