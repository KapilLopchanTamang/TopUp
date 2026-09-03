export type SeedRow = { amountLabel: string; price: string; sortOrder: number; isHighlighted?: boolean };
export type SeedGroup = { label?: string; sortOrder: number; rows: SeedRow[] };
export type SeedGame = { slug: string; name: string; imageUrl: string; sortOrder: number; groups: SeedGroup[] };

export const seedGames: SeedGame[] = [
  {
    slug: "free-fire",
    name: "Free Fire",
    imageUrl: "/games-img/free-fire.jpeg",
    sortOrder: 1,
    groups: [
      {
        label: "Diamonds",
        sortOrder: 1,
        rows: [
          { amountLabel: "115 💎", price: "380", sortOrder: 1 },
          { amountLabel: "240 💎", price: "740", sortOrder: 2 },
          { amountLabel: "355 💎", price: "1100", sortOrder: 3 },
          { amountLabel: "480 💎", price: "1460", sortOrder: 4, isHighlighted: true },
          { amountLabel: "610 💎", price: "1820", sortOrder: 5 },
          { amountLabel: "850 💎", price: "2540", sortOrder: 6 },
          { amountLabel: "965 💎", price: "2900", sortOrder: 7 },
          { amountLabel: "1090 💎", price: "3260", sortOrder: 8 },
        ],
      },
      {
        label: "Membership",
        sortOrder: 2,
        rows: [
          { amountLabel: "Weekly Membership", price: "200", sortOrder: 1 },
          { amountLabel: "Monthly Membership", price: "1000", sortOrder: 2, isHighlighted: true },
          { amountLabel: "Level Up Pass", price: "550", sortOrder: 3 },
        ],
      },
      {
        label: "Diamond Bundles",
        sortOrder: 3,
        rows: [
          { amountLabel: "1240 💎 Bundle", price: "3620", sortOrder: 1 },
          { amountLabel: "2180 💎 Bundle", price: "6400", sortOrder: 2 },
        ],
      },
    ],
  },
  {
    slug: "tiktok",
    name: "TikTok Coins",
    imageUrl: "https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png",
    sortOrder: 2,
    groups: [
      {
        label: "Small Pack",
        sortOrder: 1,
        rows: [
          { amountLabel: "70 COIN", price: "135", sortOrder: 1 },
          { amountLabel: "140 COIN", price: "270", sortOrder: 2 },
          { amountLabel: "350 COIN", price: "660", sortOrder: 3 },
          { amountLabel: "700 COIN", price: "1310", sortOrder: 4 },
          { amountLabel: "1400 COIN", price: "2600", sortOrder: 5 },
          { amountLabel: "2100 COIN", price: "3880", sortOrder: 6 },
          { amountLabel: "3500 COIN", price: "6450", sortOrder: 7, isHighlighted: true },
          { amountLabel: "5000 COIN", price: "9200", sortOrder: 8 },
          { amountLabel: "7000 COIN", price: "12850", sortOrder: 9 },
          { amountLabel: "8500 COIN", price: "15600", sortOrder: 10 },
          { amountLabel: "10000 COIN", price: "18300", sortOrder: 11 },
        ],
      },
      {
        label: "Big Pack",
        sortOrder: 2,
        rows: [
          { amountLabel: "1120 COIN", price: "2,080", sortOrder: 1 },
          { amountLabel: "2240 COIN", price: "4,100", sortOrder: 2 },
          { amountLabel: "3360 COIN", price: "6,150", sortOrder: 3 },
          { amountLabel: "4480 COIN", price: "8,180", sortOrder: 4 },
          { amountLabel: "5600 COIN", price: "10,200", sortOrder: 5, isHighlighted: true },
          { amountLabel: "7000 COIN", price: "12,800", sortOrder: 6 },
          { amountLabel: "8500 COIN", price: "15,500", sortOrder: 7 },
          { amountLabel: "10000 COIN", price: "18,200", sortOrder: 8 },
          { amountLabel: "15000 COIN", price: "27,200", sortOrder: 9 },
          { amountLabel: "17000 COIN", price: "30,800", sortOrder: 10 },
          { amountLabel: "20000 COIN", price: "36,200", sortOrder: 11 },
          { amountLabel: "25000 COIN", price: "45,000", sortOrder: 12 },
          { amountLabel: "30000 COIN", price: "54,000", sortOrder: 13 },
          { amountLabel: "35000 COIN", price: "63,000", sortOrder: 14 },
          { amountLabel: "40000 COIN", price: "72,000", sortOrder: 15 },
          { amountLabel: "50000 COIN", price: "90,000", sortOrder: 16 },
        ],
      },
    ],
  },
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    imageUrl: "/games-img/pubg-mobile.jpg",
    sortOrder: 3,
    groups: [
      {
        label: "UC Packs",
        sortOrder: 1,
        rows: [
          { amountLabel: "60 UC", price: "135", sortOrder: 1 },
          { amountLabel: "325 UC", price: "660", sortOrder: 2 },
          { amountLabel: "660 UC", price: "1310", sortOrder: 3, isHighlighted: true },
          { amountLabel: "1800 UC", price: "3450", sortOrder: 4 },
          { amountLabel: "3850 UC", price: "6900", sortOrder: 5 },
          { amountLabel: "8100 UC", price: "13800", sortOrder: 6 },
        ],
      },
    ],
  },
  {
    slug: "efootball",
    name: "eFootball",
    imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1665460/capsule_616x353.jpg",
    sortOrder: 4,
    groups: [
      {
        label: "Coins",
        sortOrder: 1,
        rows: [
          { amountLabel: "100 COINS", price: "155", sortOrder: 1 },
          { amountLabel: "300 COINS", price: "420", sortOrder: 2 },
          { amountLabel: "550 COINS", price: "750", sortOrder: 3 },
          { amountLabel: "750 COINS", price: "980", sortOrder: 4 },
          { amountLabel: "1040 COINS", price: "1360", sortOrder: 5, isHighlighted: true },
          { amountLabel: "2130 COINS", price: "2680", sortOrder: 6 },
          { amountLabel: "3250 COINS", price: "3980", sortOrder: 7 },
          { amountLabel: "5050 COINS", price: "6050", sortOrder: 8 },
          { amountLabel: "6300 COINS", price: "7400", sortOrder: 9 },
        ],
      },
      {
        label: "Special Packs",
        sortOrder: 2,
        rows: [
          { amountLabel: "Suarez Pack", price: "1250", sortOrder: 1 },
          { amountLabel: "Goal Keeper Pack", price: "1150", sortOrder: 2 },
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
