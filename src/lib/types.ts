export type GameRow = {
  id: string;
  groupId: string;
  amountLabel: string;
  price: string;
  isHighlighted: boolean;
  sortOrder: number;
};

export type GameGroup = {
  id: string;
  gameId: string;
  label: string | null;
  sortOrder: number;
  rows: GameRow[];
};

export type Game = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  groups: GameGroup[];
};

export type SiteSettings = {
  id: number;
  whatsappNumber: string;
  facebookUrl: string | null;
  messengerUrl: string | null;
  paymentMethodsText: string | null;
  promoBannerText: string | null;
};