export interface CurrencyIconConfig {
  src: string;
  alt: string;
  type: "image" | "emoji";
}

export function getCurrencyIcon(gameSlug: string, amountLabel: string = ""): CurrencyIconConfig {
  const slug = (gameSlug || "").toLowerCase();
  const label = (amountLabel || "").toLowerCase();

  if (label.includes("pass") || label.includes("membership")) {
    return {
      src: "/images/coins/free-fire-diamond.jpeg",
      alt: "Free Fire Pass",
      type: "image",
    };
  }

  if (slug.includes("free-fire") || slug.includes("freefire")) {
    return {
      src: "/images/coins/free-fire-diamond.png",
      alt: "Free Fire Diamond",
      type: "image",
    };
  }

  if (slug.includes("tiktok")) {
    return {
      src: "/images/coins/tiktok-coin.jpeg",
      alt: "TikTok Coin",
      type: "image",
    };
  }

  if (slug.includes("pubg")) {
    return {
      src: "/images/coins/pubg-uc-card.png",
      alt: "PUBG Mobile UC",
      type: "image",
    };
  }

  if (slug.includes("efootball")) {
    return {
      src: "/images/coins/efootball-coins.jpg",
      alt: "eFootball Coins",
      type: "image",
    };
  }

  return {
    src: "",
    alt: "Currency",
    type: "emoji",
  };
}
