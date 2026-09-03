/**
 * WhatsApp URL helpers for prefilling buy messages.
 */

export interface WhatsAppOrderParams {
  whatsappNumber: string;
  gameName: string;
  amountLabel: string;
  price: string;
}

export function buildWhatsAppMessage(gameName: string, amountLabel: string, price: string): string {
  return `Hi! I want to order:\n${gameName} – ${amountLabel}\nPrice: Rs. ${price}\n\nPlease confirm.`;
}

export function buildWhatsAppUrl({ whatsappNumber, gameName, amountLabel, price }: WhatsAppOrderParams): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const text = buildWhatsAppMessage(gameName, amountLabel, price);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export function whatsappLink(number: string, gameName: string, amountLabel: string, price: string): string {
  return buildWhatsAppUrl({
    whatsappNumber: number,
    gameName,
    amountLabel,
    price,
  });
}
