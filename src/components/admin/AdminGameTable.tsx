"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteGameButton } from "@/components/admin/DeleteGameButton";
import { Edit, Gamepad2, EyeOff, Search, Sparkles, Smartphone, ExternalLink } from "lucide-react";
import type { Game } from "@/lib/types";

interface AdminGameTableProps {
  games: Game[];
}

export function AdminGameTable({ games }: AdminGameTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Collect distinct categories with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const g of games) {
      const cat = g.category || "Gaming Top-ups";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [games]);

  const categoryList = useMemo(() => {
    return Object.keys(categories).sort((a, b) => {
      // Prioritize Gaming Top-ups first, then Apps Top-ups
      if (a === "Gaming Top-ups") return -1;
      if (b === "Gaming Top-ups") return 1;
      if (a === "Apps Top-ups") return -1;
      if (b === "Apps Top-ups") return 1;
      return a.localeCompare(b);
    });
  }, [categories]);

  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      const cat = g.category || "Gaming Top-ups";
      const matchesCategory = selectedCategory === "all" || cat.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [games, selectedCategory, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Category filter pills & Search bar */}
      <div className="p-3 sm:p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01]">
        {/* Category Pills - scrollable on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`text-xs px-3 py-1.5 rounded-xl border font-semibold whitespace-nowrap shrink-0 transition-all ${
              selectedCategory === "all"
                ? "bg-white/15 border-white/30 text-white shadow-sm"
                : "bg-white/[0.04] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            All Services ({games.length})
          </button>
          {categoryList.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const isGaming = cat.toLowerCase().includes("game") || cat.toLowerCase().includes("gaming");
            const isApp = cat.toLowerCase().includes("app");

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? isGaming
                      ? "bg-violet-600/30 border-violet-500 text-violet-200 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                      : isApp
                      ? "bg-emerald-600/30 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-cyan-600/30 border-cyan-500 text-cyan-200"
                    : "bg-white/[0.04] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <span>{isGaming ? "🎮" : isApp ? "📱" : "✨"}</span>
                <span>{cat}</span>
                <span className="opacity-60 text-[10px]">({categories[cat]})</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-white/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service or slug..."
            className="w-full pl-8 pr-3 py-2 sm:py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder:text-white/30 outline-none focus:border-violet-500/60 focus:bg-white/[0.08]"
          />
        </div>
      </div>

      {/* Content view */}
      {filteredGames.length === 0 ? (
        <div className="p-12 text-center">
          <Gamepad2 className="mx-auto size-10 text-white/20 mb-3" />
          <h3 className="text-base font-semibold text-white">No services found</h3>
          <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
            {searchQuery || selectedCategory !== "all"
              ? "No services match your current filter. Try selecting 'All' or clearing search."
              : "Seed initial data using npm run db:seed or click Add Game."}
          </p>
        </div>
      ) : (
        <>
          {/* MOBILE CARDS VIEW (md:hidden) */}
          <div className="block md:hidden divide-y divide-white/[0.08] px-3">
            {filteredGames.map((g) => {
              const packageCount = g.groups.reduce((acc, grp) => acc + grp.rows.length, 0);
              const cat = g.category || "Gaming Top-ups";
              const isGaming = cat.toLowerCase().includes("game") || cat.toLowerCase().includes("gaming");
              const isApp = cat.toLowerCase().includes("app");

              return (
                <div key={g.id} className="py-3.5 first:pt-1 last:pb-2 space-y-2.5">
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="size-14 rounded-xl bg-white/5 border border-white/10 overflow-hidden relative shrink-0 grid place-items-center">
                      {g.imageUrl ? (
                        <Image
                          src={g.imageUrl}
                          alt={g.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <Gamepad2 className="size-6 text-white/30" />
                      )}
                    </div>

                    {/* Name, Slug, & Status */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-sm text-white truncate">{g.name}</div>
                        {g.isActive ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 shrink-0">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10 shrink-0">
                            Hidden
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-white/40 font-mono mt-0.5">/{g.slug}</div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {isGaming ? (
                          <span className="text-[11px] font-semibold text-violet-300 bg-violet-500/15 border border-violet-500/25 px-2 py-0.5 rounded-lg flex items-center gap-1">
                            🎮 Gaming Top-up
                          </span>
                        ) : isApp ? (
                          <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-lg flex items-center gap-1">
                            📱 App Top-up
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-500/25 px-2 py-0.5 rounded-lg">
                            ✨ {cat}
                          </span>
                        )}
                        <span className="text-[11px] text-white/50">
                          {g.groups.length} grp • {packageCount} pkgs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/admin/games/${g.id}/edit`}
                      className="flex-1 py-2 px-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 active:scale-95 border border-violet-500/30 text-violet-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all min-h-[40px]"
                    >
                      <Edit className="size-3.5 text-violet-400" />
                      <span>Edit Packages</span>
                    </Link>

                    <Link
                      href={`/games/${g.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] active:scale-95 border border-white/10 text-white/70 text-xs font-semibold flex items-center justify-center gap-1 transition-all min-h-[40px]"
                      title="View on Storefront"
                    >
                      <ExternalLink className="size-3.5" />
                      <span className="sr-only sm:not-sr-only sm:inline">Store</span>
                    </Link>

                    <DeleteGameButton
                      id={g.id}
                      name={g.name}
                      className="h-10 px-3 text-xs font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/20 rounded-xl"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE VIEW (hidden md:block) */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader className="border-white/10 bg-white/[0.02]">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-[70px] text-white/60">Image</TableHead>
                  <TableHead className="text-white/60">Name / Slug</TableHead>
                  <TableHead className="text-white/60">Category</TableHead>
                  <TableHead className="text-white/60">Status</TableHead>
                  <TableHead className="text-white/60">Packages</TableHead>
                  <TableHead className="text-white/60 text-center">Order</TableHead>
                  <TableHead className="text-right text-white/60">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((g) => {
                  const packageCount = g.groups.reduce((acc, grp) => acc + grp.rows.length, 0);
                  const cat = g.category || "Gaming Top-ups";
                  const isGaming = cat.toLowerCase().includes("game") || cat.toLowerCase().includes("gaming");
                  const isApp = cat.toLowerCase().includes("app");

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
                        {isGaming ? (
                          <Badge className="bg-violet-500/15 text-violet-300 border-violet-500/25 flex items-center gap-1 w-fit">
                            <Gamepad2 className="size-3" />
                            <span>Gaming Top-up</span>
                          </Badge>
                        ) : isApp ? (
                          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/25 flex items-center gap-1 w-fit">
                            <Smartphone className="size-3" />
                            <span>App Top-up</span>
                          </Badge>
                        ) : (
                          <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/25 flex items-center gap-1 w-fit">
                            <Sparkles className="size-3" />
                            <span>{cat}</span>
                          </Badge>
                        )}
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
          </div>
        </>
      )}
    </div>
  );
}
