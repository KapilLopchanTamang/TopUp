import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppMessage, buildWhatsAppUrl, whatsappLink } from "../src/lib/whatsapp";

describe("WhatsApp URL Builder", () => {
  test("builds correct prefilled message", () => {
    const msg = buildWhatsAppMessage("Free Fire", "115 💎", "380");
    assert.equal(
      msg,
      "Hi! I want to order:\nFree Fire – 115 💎\nPrice: Rs. 380\n\nPlease confirm."
    );
  });

  test("sanitizes phone number and constructs valid wa.me URL", () => {
    const url = buildWhatsAppUrl({
      whatsappNumber: "+977 986-391-2884",
      gameName: "PUBG Mobile",
      amountLabel: "60 UC",
      price: "135",
    });

    assert.ok(url.startsWith("https://wa.me/9779863912884?text="));
    assert.ok(url.includes("PUBG%20Mobile"));
    assert.ok(url.includes("60%20UC"));
    assert.ok(url.includes("135"));
  });

  test("whatsappLink helper matches buildWhatsAppUrl", () => {
    const url1 = whatsappLink("9779863912884", "eFootball", "100 COINS", "155");
    const url2 = buildWhatsAppUrl({
      whatsappNumber: "9779863912884",
      gameName: "eFootball",
      amountLabel: "100 COINS",
      price: "155",
    });
    assert.equal(url1, url2);
  });
});
