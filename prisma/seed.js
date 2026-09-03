/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data (only if tables exist)
  try {
    await prisma.game.deleteMany({});
    console.log('✅ Cleared existing games');
  } catch (_error) {
    console.log('ℹ️  No existing data to clear');
  }

  // Create games with local images
  const games = [
    {
      name: 'Free Fire',
      slug: 'free-fire',
      imageUrl: '/images/games/free-fire.jpeg',
      isActive: true,
      sortOrder: 1,
      groups: {
        create: [
          {
            label: 'Diamonds',
            sortOrder: 0,
            rows: {
              create: [
                { amountLabel: '115 💎', price: '380', isHighlighted: false, sortOrder: 0 },
                { amountLabel: '310 💎', price: '990', isHighlighted: false, sortOrder: 1 },
                { amountLabel: '520 💎', price: '1650', isHighlighted: true, sortOrder: 2 },
                { amountLabel: '1060 💎', price: '3300', isHighlighted: false, sortOrder: 3 },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'PUBG Mobile',
      slug: 'pubg-mobile',
      imageUrl: '/images/games/pubg-mobile.jpg',
      isActive: true,
      sortOrder: 2,
      groups: {
        create: [
          {
            label: 'UC',
            sortOrder: 0,
            rows: {
              create: [
                { amountLabel: '60 UC', price: '200', isHighlighted: false, sortOrder: 0 },
                { amountLabel: '325 UC', price: '990', isHighlighted: true, sortOrder: 1 },
                { amountLabel: '660 UC', price: '1990', isHighlighted: false, sortOrder: 2 },
                { amountLabel: '1800 UC', price: '4990', isHighlighted: false, sortOrder: 3 },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'TikTok Coins',
      slug: 'tiktok',
      imageUrl: '/images/games/tiktok.jpeg',
      isActive: true,
      sortOrder: 3,
      groups: {
        create: [
          {
            label: 'Coins',
            sortOrder: 0,
            rows: {
              create: [
                { amountLabel: '70 Coins', price: '150', isHighlighted: false, sortOrder: 0 },
                { amountLabel: '350 Coins', price: '700', isHighlighted: false, sortOrder: 1 },
                { amountLabel: '700 Coins', price: '1400', isHighlighted: true, sortOrder: 2 },
                { amountLabel: '1400 Coins', price: '2800', isHighlighted: false, sortOrder: 3 },
              ],
            },
          },
        ],
      },
    },
    {
      name: 'eFootball',
      slug: 'efootball',
      imageUrl: '/images/games/efootball.jpeg',
      isActive: true,
      sortOrder: 4,
      groups: {
        create: [
          {
            label: 'eFootball Coins',
            sortOrder: 0,
            rows: {
              create: [
                { amountLabel: '100 Coins', price: '250', isHighlighted: false, sortOrder: 0 },
                { amountLabel: '500 Coins', price: '1200', isHighlighted: true, sortOrder: 1 },
                { amountLabel: '1200 Coins', price: '2800', isHighlighted: false, sortOrder: 2 },
                { amountLabel: '3100 Coins', price: '6990', isHighlighted: false, sortOrder: 3 },
              ],
            },
          },
        ],
      },
    },
  ];

  for (const game of games) {
    await prisma.game.create({
      data: game,
    });
    console.log(`✅ Created game: ${game.name}`);
  }

  console.log('🎉 Database seeded successfully!');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
