import Image from "next/image";
import { getCurrencyIcon } from "@/lib/currencies";

interface CurrencyIconProps {
  gameSlug: string;
  amountLabel?: string;
  className?: string;
  size?: number;
}

export function CurrencyIcon({
  gameSlug,
  amountLabel = "",
  className = "w-5 h-5",
  size = 24,
}: CurrencyIconProps) {
  const icon = getCurrencyIcon(gameSlug, amountLabel);

  if (icon.type === "image" && icon.src) {
    return (
      <div className={`relative shrink-0 overflow-hidden ${className}`}>
        <Image
          src={icon.src}
          alt={icon.alt}
          fill
          sizes={`${size * 2}px`}
          className="object-contain"
          unoptimized
        />
      </div>
    );
  }

  return <span className="text-sm">💎</span>;
}
