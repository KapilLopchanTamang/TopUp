import { prisma } from "./db";
import { seedGames, defaultSettings, type SeedGame } from "./seed-data";
import type { Game, SiteSettings } from "./types";

function seedGroups(g: SeedGame): Game["groups"] {
  return g.groups.map((grp, gi) => ({
    id: `${g.slug}-${gi}`,
    gameId: g.slug,
    label: grp.label ?? null,
    sortOrder: grp.sortOrder,
    rows: grp.rows.map((r, ri) => ({
      id: `${g.slug}-${gi}-${ri}`,
      groupId: `${g.slug}-${gi}`,
      amountLabel: r.amountLabel,
      price: r.price,
      isHighlighted: r.isHighlighted || false,
      sortOrder: r.sortOrder,
    })),
  }));
}

function seedToGame(g: SeedGame): Game {
  return {
    id: g.slug,
    slug: g.slug,
    name: g.name,
    imageUrl: g.imageUrl,
    sortOrder: g.sortOrder,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    groups: seedGroups(g),
  };
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (s) return s;
  } catch (error) {
    console.error("Database error in getSettings:", error);
  }
  return { id: 1, ...defaultSettings };
}

export async function getGames(): Promise<Game[]> {
  try {
    const games = await prisma.game.findMany({
      where: { isActive: true },
      include: { groups: { include: { rows: { orderBy: { sortOrder: "asc" } } }, orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
    });
    if (games.length > 0) return games as unknown as Game[];
  } catch (error) {
    console.error("Database error in getGames:", error);
  }
  return seedGames.map((g) => seedToGame(g));
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  try {
    const game = await prisma.game.findUnique({
      where: { slug },
      include: { groups: { include: { rows: { orderBy: { sortOrder: "asc" } } }, orderBy: { sortOrder: "asc" } } },
    });
    if (game) return game as unknown as Game;
  } catch (error) {
    console.error("Database error in getGameBySlug:", error);
  }
  const seed = seedGames.find((g) => g.slug === slug);
  if (!seed) return null;
  return seedToGame(seed);
}

export function whatsappLink(number: string, gameName: string, amountLabel: string, price: string) {
  const text = encodeURIComponent(`Hi! I want to order: ${gameName} – ${amountLabel} (Rs. ${price}). Please confirm.`);
  const clean = number.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${text}`;
}
