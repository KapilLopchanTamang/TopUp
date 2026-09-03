import { getSettings } from "@/lib/data";
export const revalidate = 3600;
export const metadata = { title: "Contact — ARG Topup" };

function IconExternal(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}><path d="M7 17 17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

export default async function Contact() {
  const s = await getSettings();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-[var(--font-russo)] text-2xl tracking-wide">CONTACT</h1>
      <p className="text-white/60 text-sm mt-2">Fastest way is WhatsApp — we reply within minutes. All touch targets are 44px minimum.</p>
      <div className="mt-6 space-y-3">
        <a href={`https://wa.me/${s.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${s.whatsappNumber}`} className="flex items-center justify-between rounded-2xl bg-[#25D366] hover:bg-[#1ebe5a] active:bg-[#128C7E] text-white p-5 font-bold transition-colors duration-200 cursor-pointer min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F23]">
          <span>WhatsApp: {s.whatsappNumber}</span><IconExternal className="w-5 h-5" aria-hidden />
        </a>
        {s.facebookUrl && (
          <a href={s.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl bg-[#1877F2] hover:bg-[#1669d9] text-white p-5 font-bold transition-colors duration-200 cursor-pointer min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2]">
            <span>Facebook Page</span><IconExternal className="w-5 h-5" aria-hidden />
          </a>
        )}
        {s.messengerUrl && (
          <a href={s.messengerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl bg-white hover:bg-white/90 text-black p-5 font-bold transition-colors duration-200 cursor-pointer min-h-[56px]">
            <span>Messenger</span><IconExternal className="w-5 h-5" aria-hidden />
          </a>
        )}
      </div>
      <div className="mt-6 text-xs text-white/40 leading-relaxed">Working hours: 8AM – 11PM NPT • Instant delivery even at night when possible • No horizontal scroll, fully responsive 375/768/1024/1440</div>
    </div>
  );
}
