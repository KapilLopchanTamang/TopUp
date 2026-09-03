import { getSettings } from "@/lib/data";

export const revalidate = 3600;
export const metadata = { title: "Payment Methods — ARG Topup" };

export default async function PaymentMethods() {
  const s = await getSettings();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-[var(--font-russo)] text-2xl tracking-wide">PAYMENT METHODS</h1>
      <p className="text-white/60 text-sm mt-2 leading-relaxed">All payments are handled manually via WhatsApp. No online checkout — just send proof after we confirm on WhatsApp.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {[
          { name: "eSewa", desc: "Send to our eSewa id / QR shared on WhatsApp" },
          { name: "Khalti", desc: "Khalti wallet transfer — QR on WhatsApp" },
          { name: "IME Pay", desc: "IME Pay wallet — details on WhatsApp" },
          { name: "Bank Transfer", desc: "Bank QR / account details shared on WhatsApp" },
        ].map((p) => (
          <div key={p.name} className="rounded-2xl bg-[#1A1A33] border border-white/[0.08] p-5 hover:bg-[#1E1E3A] transition-colors duration-200">
            <div className="font-bold text-sm">{p.name}</div>
            <div className="text-sm text-white/60 mt-1 leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-[#1A1A33] border border-white/[0.08] p-5">
        <div className="font-semibold text-sm">Current info</div>
        <div className="text-white/60 mt-1 break-all text-sm leading-relaxed">{s.paymentMethodsText}</div>
        <a href={`https://wa.me/${s.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex mt-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors duration-200 cursor-pointer min-h-[44px]">Ask on WhatsApp</a>
      </div>
    </div>
  );
}
