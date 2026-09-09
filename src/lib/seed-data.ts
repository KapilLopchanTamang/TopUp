export type SeedRow = { amountLabel: string; price: string; sortOrder: number; isHighlighted?: boolean };
export type SeedGroup = { label?: string; sortOrder: number; rows: SeedRow[] };
export type SeedGame = { slug: string; name: string; imageUrl: string; sortOrder: number; groups: SeedGroup[] };

export const seedGames: SeedGame[] = [
  {
    slug: "free-fire",
    name: "Free Fire",
    imageUrl: "/images/games/free-fire.jpeg",
    sortOrder: 1,
    groups: [
      {
        label: "Diamond Topup",
        sortOrder: 1,
        rows: [
          { amountLabel: "115 💎", price: "100", sortOrder: 1 },
          { amountLabel: "240 💎", price: "200", sortOrder: 2 },
          { amountLabel: "355 💎", price: "300", sortOrder: 3 },
          { amountLabel: "480 💎", price: "400", sortOrder: 4 },
          { amountLabel: "610 💎", price: "500", sortOrder: 5 },
          { amountLabel: "725 💎", price: "600", sortOrder: 6 },
          { amountLabel: "850 💎", price: "700", sortOrder: 7 },
          { amountLabel: "965 💎", price: "800", sortOrder: 8 },
          { amountLabel: "1090 💎", price: "900", sortOrder: 9 },
          { amountLabel: "1240 💎", price: "1000", sortOrder: 10, isHighlighted: true },
        ],
      },
      {
        label: "Memberships & Passes",
        sortOrder: 2,
        rows: [
          { amountLabel: "Weekly Membership", price: "200", sortOrder: 1, isHighlighted: true },
          { amountLabel: "Monthly Membership", price: "1000", sortOrder: 2, isHighlighted: true },
          { amountLabel: "Level Up Pass", price: "550", sortOrder: 3, isHighlighted: true },
        ],
      },
    ],
  },
  {
    slug: "tiktok",
    name: "TikTok Coins",
    imageUrl: "/images/games/tiktok.jpeg",
    sortOrder: 2,
    groups: [
      {
        label: "Small Pack",
        sortOrder: 1,
        rows: [
          { amountLabel: "70 COIN", price: "135", sortOrder: 1 },
          { amountLabel: "140 COIN", price: "260", sortOrder: 2 },
          { amountLabel: "210 COIN", price: "390", sortOrder: 3 },
          { amountLabel: "280 COIN", price: "520", sortOrder: 4 },
          { amountLabel: "350 COIN", price: "650", sortOrder: 5 },
          { amountLabel: "420 COIN", price: "780", sortOrder: 6 },
          { amountLabel: "490 COIN", price: "910", sortOrder: 7 },
          { amountLabel: "560 COIN", price: "1040", sortOrder: 8 },
          { amountLabel: "630 COIN", price: "1170", sortOrder: 9 },
          { amountLabel: "700 COIN", price: "1300", sortOrder: 10, isHighlighted: true },
        ],
      },
      {
        label: "Big Pack",
        sortOrder: 2,
        rows: [
          { amountLabel: "1120 COIN", price: "2080", sortOrder: 1 },
          { amountLabel: "1190 COIN", price: "2210", sortOrder: 2 },
          { amountLabel: "1260 COIN", price: "2340", sortOrder: 3 },
          { amountLabel: "1330 COIN", price: "2470", sortOrder: 4 },
          { amountLabel: "1400 COIN", price: "2600", sortOrder: 5 },
          { amountLabel: "1470 COIN", price: "2730", sortOrder: 6 },
          { amountLabel: "1540 COIN", price: "2860", sortOrder: 7 },
          { amountLabel: "1610 COIN", price: "2990", sortOrder: 8 },
          { amountLabel: "1680 COIN", price: "3120", sortOrder: 9 },
          { amountLabel: "1750 COIN", price: "3250", sortOrder: 10 },
          { amountLabel: "1820 COIN", price: "3380", sortOrder: 11 },
          { amountLabel: "1890 COIN", price: "3510", sortOrder: 12 },
          { amountLabel: "1960 COIN", price: "3640", sortOrder: 13 },
          { amountLabel: "2030 COIN", price: "3770", sortOrder: 14 },
          { amountLabel: "2100 COIN", price: "3900", sortOrder: 15, isHighlighted: true },
        ],
      },
    ],
  },
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    imageUrl: "/images/games/pubg-mobile.jpg",
    sortOrder: 3,
    groups: [
      {
        label: "UC Packs",
        sortOrder: 1,
        rows: [
          { amountLabel: "60 UC", price: "155", sortOrder: 1 },
          { amountLabel: "325 UC", price: "775", sortOrder: 2 },
          { amountLabel: "660 UC", price: "1550", sortOrder: 3, isHighlighted: true },
          { amountLabel: "1800 UC", price: "3875", sortOrder: 4 },
          { amountLabel: "3850 UC", price: "7750", sortOrder: 5 },
          { amountLabel: "8100 UC", price: "15500", sortOrder: 6, isHighlighted: true },
        ],
      },
    ],
  },
  {
    slug: "efootball",
    name: "eFootball",
    imageUrl: "/images/games/efootball.jpeg",
    sortOrder: 4,
    groups: [
      {
        label: "Coin Price List",
        sortOrder: 1,
        rows: [
          { amountLabel: "130 COIN", price: "190", sortOrder: 1 },
          { amountLabel: "300 COIN", price: "430", sortOrder: 2 },
          { amountLabel: "550 COIN", price: "765", sortOrder: 3 },
          { amountLabel: "750 COIN", price: "1035", sortOrder: 4 },
          { amountLabel: "1040 COIN", price: "1405", sortOrder: 5, isHighlighted: true },
          { amountLabel: "2130 COIN", price: "2875", sortOrder: 6 },
          { amountLabel: "3250 COIN", price: "4315", sortOrder: 7 },
          { amountLabel: "5700 COIN", price: "7035", sortOrder: 8 },
          { amountLabel: "12800 COIN", price: "15035", sortOrder: 9, isHighlighted: true },
        ],
      },
      {
        label: "Special Packs",
        sortOrder: 2,
        rows: [
          { amountLabel: "Suarez Pack", price: "160", sortOrder: 1, isHighlighted: true },
          { amountLabel: "Goal Keeper Pack", price: "400", sortOrder: 2, isHighlighted: true },
        ],
      },
    ],
  },
  {
    slug: "netflix",
    name: "Netflix",
    imageUrl: "/images/games/netflix.png",
    sortOrder: 5,
    groups: [
      {
        label: "Personal Profile (4K UHD)",
        sortOrder: 1,
        rows: [
          { amountLabel: "1 Month (1 Screen)", price: "450", sortOrder: 1, isHighlighted: true },
          { amountLabel: "3 Months (1 Screen)", price: "1300", sortOrder: 2 },
          { amountLabel: "6 Months (1 Screen)", price: "2500", sortOrder: 3 },
          { amountLabel: "1 Year (1 Screen)", price: "4800", sortOrder: 4 },
        ],
      },
      {
        label: "Full Account (Private 4 Screens)",
        sortOrder: 2,
        rows: [
          { amountLabel: "1 Month Full Account", price: "1650", sortOrder: 1 },
          { amountLabel: "3 Months Full Account", price: "4800", sortOrder: 2 },
        ],
      },
    ],
  },
];

export const defaultSettings = {
  whatsappNumber: "9779863912884",
  facebookUrl: "https://facebook.com/allroundergamingtopup",
  messengerUrl: "https://m.me/allroundergamingtopup",
  paymentMethodsText: "eSewa • Khalti • IME Pay • Bank Transfer",
  promoBannerText: "⚡ Instant Delivery  •  100% Secure  •  Best Price Guaranteed",
};
