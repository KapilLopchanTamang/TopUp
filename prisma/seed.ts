import { PrismaClient } from "@prisma/client";
import { seedGames, defaultSettings } from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  for (const g of seedGames) {
    const game = await prisma.game.upsert({
      where: { slug: g.slug },
      update: { name: g.name, imageUrl: g.imageUrl, sortOrder: g.sortOrder, isActive: true },
      create: { slug: g.slug, name: g.name, imageUrl: g.imageUrl, sortOrder: g.sortOrder, isActive: true },
    });

    await prisma.packageGroup.deleteMany({ where: { gameId: game.id } });

    for (const grp of g.groups) {
      const group = await prisma.packageGroup.create({
        data: { gameId: game.id, label: grp.label, sortOrder: grp.sortOrder },
      });
      for (const row of grp.rows) {
        await prisma.packageRow.create({
          data: {
            groupId: group.id,
            amountLabel: row.amountLabel,
            price: row.price,
            isHighlighted: row.isHighlighted || false,
            sortOrder: row.sortOrder,
          },
        });
      }
    }
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { ...defaultSettings },
    create: { id: 1, ...defaultSettings },
  });

  console.log("Seed done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
