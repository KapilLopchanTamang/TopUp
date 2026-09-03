import { prisma } from "@/lib/db";
import { updateSettings } from "@/lib/actions";
import type { SiteSettings } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let s: SiteSettings | null = null;
  try {
    s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {}
  const safe: SiteSettings = s ?? {
    id: 1,
    whatsappNumber: "9779863912884",
    facebookUrl: "",
    messengerUrl: "",
    paymentMethodsText: "",
    promoBannerText: "",
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Site Settings</h1>
        <p className="text-sm text-white/60">
          Configure site-wide contact info, banners, and manual payment descriptions.
        </p>
      </div>

      <Card className="bg-[#0E1220] border-white/10">
        <CardHeader className="border-b border-white/10 pb-4">
          <CardTitle className="text-base text-white">Storefront Configuration</CardTitle>
          <CardDescription className="text-white/50 text-xs">
            These values update the live storefront layout and order buttons.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form action={updateSettings} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="whatsappNumber" className="text-xs text-white/80">
                WhatsApp Order Number
              </Label>
              <Input
                id="whatsappNumber"
                name="whatsappNumber"
                defaultValue={safe.whatsappNumber}
                required
                className="bg-white/[0.06] border-white/10 text-white"
                placeholder="9779863912884"
              />
              <p className="text-[11px] text-white/40">Digits only, including country code (e.g. 9779863912884).</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="facebookUrl" className="text-xs text-white/80">
                Facebook Page URL
              </Label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                defaultValue={safe.facebookUrl || ""}
                className="bg-white/[0.06] border-white/10 text-white"
                placeholder="https://facebook.com/allroundergamingtopup"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="messengerUrl" className="text-xs text-white/80">
                Messenger URL
              </Label>
              <Input
                id="messengerUrl"
                name="messengerUrl"
                defaultValue={safe.messengerUrl || ""}
                className="bg-white/[0.06] border-white/10 text-white"
                placeholder="https://m.me/allroundergamingtopup"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="paymentMethodsText" className="text-xs text-white/80">
                Payment Methods Summary
              </Label>
              <Input
                id="paymentMethodsText"
                name="paymentMethodsText"
                defaultValue={safe.paymentMethodsText || ""}
                className="bg-white/[0.06] border-white/10 text-white"
                placeholder="eSewa • Khalti • IME Pay • Bank Transfer"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="promoBannerText" className="text-xs text-white/80">
                Promotional Header Banner Text
              </Label>
              <Input
                id="promoBannerText"
                name="promoBannerText"
                defaultValue={safe.promoBannerText || ""}
                className="bg-white/[0.06] border-white/10 text-white"
                placeholder="⚡ Instant Delivery • 100% Secure • Best Price Guaranteed"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold mt-4"
            >
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
