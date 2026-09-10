import { getSettings } from "@/lib/data";
export const revalidate = 3600;
export const metadata = { title: "Contact — ARG Topup" };

function IconExternal(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}><path d="M7 17 17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

export default async function Contact() {
  const s = await getSettings();
  return (
    <div className="w-full px-3.5 sm:px-4 py-5">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-2 h-6 bg-gradient-to-b from-[#25D366] to-[#128C7E] rounded-full" />
        <h1 className="font-[var(--font-russo)] text-xl tracking-wide text-white">CONTACT US</h1>
      </div>
      <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
        Fastest response is on WhatsApp — active daily from 8:00 AM to 11:00 PM NPT. Tap below to chat instantly.
      </p>

      <div className="mt-4 space-y-2.5">
        <a
          href={`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent("Hello ARG Topup! I have an inquiry.")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${s.whatsappNumber}`}
          className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5a] hover:brightness-110 active:brightness-95 text-white px-4 py-3.5 font-bold shadow-lg shadow-[#25D366]/20 transition-all min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <div className="text-left">
              <div className="text-sm">WhatsApp Chat</div>
              <div className="text-[11px] font-normal opacity-90">{s.whatsappNumber}</div>
            </div>
          </div>
          <IconExternal className="w-4 h-4 opacity-80" aria-hidden />
        </a>

        {s.facebookUrl && (
          <a
            href={s.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-[#1877F2] hover:bg-[#1669d9] text-white px-4 py-3.5 font-bold transition-all min-h-[52px]"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">👍</span>
              <div className="text-left">
                <div className="text-sm">Facebook Page</div>
                <div className="text-[11px] font-normal opacity-80">Official Page & Updates</div>
              </div>
            </div>
            <IconExternal className="w-4 h-4 opacity-80" aria-hidden />
          </a>
        )}

        {s.messengerUrl && (
          <a
            href={s.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-white hover:bg-white/90 text-black px-4 py-3.5 font-bold transition-all min-h-[52px]"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div className="text-left">
                <div className="text-sm">Messenger</div>
                <div className="text-[11px] font-normal opacity-70">Direct Message Support</div>
              </div>
            </div>
            <IconExternal className="w-4 h-4 opacity-80" aria-hidden />
          </a>
        )}
      </div>

      <div className="mt-5 rounded-xl bg-[#141824] border border-white/[0.08] p-3.5 text-center">
        <div className="text-xs font-semibold text-white/80">Support Hours: 8:00 AM – 11:00 PM NPT</div>
        <div className="text-[11px] text-white/50 mt-1">Instant delivery available round the clock when online</div>
      </div>
    </div>
  );
}
