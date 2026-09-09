import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { DeleteGameButton } from "@/components/admin/DeleteGameButton";
import type { Game } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Gamepad2, Package, CheckCircle2, EyeOff, Plus, Edit } from "lucide-react";

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
          <h1 className="text-2xl font-bold tracking-tight text-white">Games Catalog</h1>
          <p className="text-sm text-white/60">
            Manage your game offerings, package tiers, and live availability.
          </p>
        </div>
        <Button render={<Link href="/admin/games/new" />} className="bg-violet-600 hover:bg-violet-500 text-white font-semibold">
          <Plus className="mr-1 size-4" /> Add Game
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-[#0E1220] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Total Games
            </CardTitle>
            <Gamepad2 className="size-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">{games.length}</div>
            <p className="text-xs text-white/40 mt-1">Configured catalog entries</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0E1220] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Active Storefront Games
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
            <p className="text-xs text-white/40 mt-1">Across all game tiers</p>
          </CardContent>
        </Card>
      </div>

      {/* Catalog Table */}
      <Card className="bg-[#0E1220] border-white/10 overflow-hidden">
        <CardHeader className="border-b border-white/10 pb-4">
          <CardTitle className="text-base text-white">All Games</CardTitle>
          <CardDescription className="text-white/50 text-xs">
            Review sorting order, package count, and edit details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {games.length === 0 ? (
            <div className="p-12 text-center">
              <Gamepad2 className="mx-auto size-10 text-white/20 mb-3" />
              <h3 className="text-base font-semibold text-white">No games found</h3>
              <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
                Seed initial data using `npm run db:seed` or click Add Game to create your first catalog entry.
              </p>
              <Button render={<Link href="/admin/games/new" />} className="mt-4 bg-violet-600 hover:bg-violet-500 text-white" size="sm">
                Add Game
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader className="border-white/10 bg-white/[0.02]">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-[80px] text-white/60">Image</TableHead>
                  <TableHead className="text-white/60">Game</TableHead>
                  <TableHead className="text-white/60">Status</TableHead>
                  <TableHead className="text-white/60">Packages</TableHead>
                  <TableHead className="text-white/60 text-center">Order</TableHead>
                  <TableHead className="text-right text-white/60">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map((g) => {
                  const packageCount = g.groups.reduce((acc, grp) => acc + grp.rows.length, 0);
                  return (
                    <TableRow key={g.id} className="border-white/10 hover:bg-white/[0.03]">
                      <TableCell>
                        <div className="size-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative grid place-items-center">
                          {g.imageUrl ? (
                            <Image
                              src={g.imageUrl}
                              alt={g.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <Gamepad2 className="size-5 text-white/30" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-sm text-white">{g.name}</div>
                        <div className="text-xs text-white/40 font-mono">/{g.slug}</div>
                      </TableCell>
                      <TableCell>
                        {g.isActive ? (
                          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-white/10 text-white/60 border-white/10">
                            <EyeOff className="mr-1 size-3" /> Hidden
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-white/70">
                        {g.groups.length} groups • {packageCount} packs
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs text-white/50">
                        {g.sortOrder}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            render={<Link href={`/admin/games/${g.id}/edit`} />}
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2.5 text-xs font-medium border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.1] hover:text-white"
                          >
                            <Edit className="mr-1 size-3.5 text-violet-400" />
                            Edit
                          </Button>
                          <DeleteGameButton id={g.id} name={g.name} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
