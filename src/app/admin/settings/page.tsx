import { prisma } from "@/lib/db";
import { updateSettings } from "@/lib/actions";
import type { SiteSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let s: SiteSettings | null = null;
  try {
    s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {}
  const safe = s ?? { id: 1, whatsappNumber: "9779863912884", facebookUrl: "", messengerUrl: "", paymentMethodsText: "", promoBannerText: "" };

  return (
    <div>
      <h1 className="text-xl font-black">Settings</h1>
      <form action={updateSettings} className="mt-6 space-y-4 max-w-xl rounded-2xl bg-[#0E1220] border border-white/[0.06] p-6">
        <label className="block text-sm font-semibold">WhatsApp Number<input name="whatsappNumber" defaultValue={safe.whatsappNumber} className="mt-1 w-full rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 outline-none" /></label>
        <label className="block text-sm font-semibold">Facebook URL<input name="facebookUrl" defaultValue={safe.facebookUrl || ""} className="mt-1 w-full rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 outline-none" /></label>
        <label className="block text-sm font-semibold">Messenger URL<input name="messengerUrl" defaultValue={safe.messengerUrl || ""} className="mt-1 w-full rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 outline-none" /></label>
        <label className="block text-sm font-semibold">Payment Methods Text<input name="paymentMethodsText" defaultValue={safe.paymentMethodsText || ""} className="mt-1 w-full rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 outline-none" /></label>
        <label className="block text-sm font-semibold">Promo Banner Text<input name="promoBannerText" defaultValue={safe.promoBannerText || ""} className="mt-1 w-full rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 outline-none" /></label>
        <button className="w-full rounded-full bg-white text-black font-extrabold py-3">Save Settings</button>
      </form>
    </div>
  );
}
