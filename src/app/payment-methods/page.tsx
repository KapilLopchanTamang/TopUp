import { getSettings } from "@/lib/data";

export const revalidate = 3600;
export const metadata = { title: "Payment Methods — ARG Topup" };

export default async function PaymentMethods() {
  const s = await getSettings();
  return (
    <div className="w-full px-3.5 sm:px-4 py-5">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-2 h-6 bg-gradient-to-b from-[#00D4FF] to-[#0090FF] rounded-full" />
        <h1 className="font-[var(--font-russo)] text-xl tracking-wide text-white">PAYMENT METHODS</h1>
      </div>
      <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
        All payments are handled securely via WhatsApp. Send payment proof (screenshot) after we confirm your order.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2.5">
        {[
          { name: "eSewa", desc: "Instant transfer via eSewa ID or QR code", badge: "POPULAR", color: "from-[#60BB46]/20 to-[#60BB46]/5 border-[#60BB46]/30 text-[#60BB46]" },
          { name: "Khalti", desc: "Khalti digital wallet transfer or QR", badge: "FAST", color: "from-[#5D2E8E]/20 to-[#5D2E8E]/5 border-[#5D2E8E]/30 text-[#A855F7]" },
          { name: "IME Pay", desc: "IME Pay digital wallet transfer", badge: "ACCEPTED", color: "from-[#E31B23]/20 to-[#E31B23]/5 border-[#E31B23]/30 text-[#F87171]" },
          { name: "Direct Bank Transfer", desc: "Mobile banking QR (Fonepay) / Account", badge: "ALL BANKS", color: "from-[#00D4FF]/20 to-[#00D4FF]/5 border-[#00D4FF]/30 text-[#38BDF8]" },
        ].map((p) => (
          <div key={p.name} className={`rounded-xl bg-gradient-to-r ${p.color} border p-3.5 transition-all`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">{p.name}</span>
              <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/90">{p.badge}</span>
            </div>
            <div className="text-xs text-white/65 mt-1 leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-[#141824] border border-white/[0.08] p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FFD700]">
          <span>ℹ️</span> Live Payment Notice
        </div>
        <div className="text-white/70 mt-1.5 text-xs leading-relaxed break-words">{s.paymentMethodsText}</div>
        <a
          href={`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent("Hello ARG Topup! I need payment details / QR code.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-3 w-full bg-[#25D366] hover:bg-[#1ebe5a] active:bg-[#128C7E] text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition-colors min-h-[44px]"
        >
          <span>Get Payment QR on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
