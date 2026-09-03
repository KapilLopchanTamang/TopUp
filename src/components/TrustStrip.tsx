function IconBolt(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinejoin="round"/></svg>; }
function IconShield(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}><path d="M12 3 5 7v6c0 3.7 2.5 7 7 8 4.5-1 7-4.3 7-8V7L12 3Z"/><path d="M9 12 11 14 15 10"/></svg>; }
function IconStar(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}><path d="M12 3 14.6 8.7 21 9.6 16 14.3 17.2 21 12 18 6.8 21 8 14.3 3 9.6 9.4 8.7 12 3Z"/></svg>; }
function IconTag(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}><path d="M20 12 12 20 4 12V4h8l8 8Z"/><circle cx="9.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/></svg>; }
function IconClock(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>; }

export function TrustStrip() {
  const items = [
    { k: "Fast", v: "Delivery in minutes", Icon: IconBolt },
    { k: "Secure", v: "100% safe & legit", Icon: IconShield },
    { k: "Trusted", v: "1000+ gamers", Icon: IconStar },
    { k: "Best Price", v: "Lowest in Nepal", Icon: IconTag },
    { k: "Instant", v: "24/7 WhatsApp", Icon: IconClock },
  ];
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
      {items.map((i) => (
        <div key={i.k} className="rounded-2xl bg-white/[0.06] border border-white/[0.08] px-3 py-4 text-center hover:bg-white/[0.08] transition-colors duration-200">
          <div className="mx-auto w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#F43F5E]/20 border border-white/10 grid place-items-center text-[#A78BFA]" aria-hidden>
            <i.Icon className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold tracking-widest text-white mt-2">{i.k.toUpperCase()}</div>
          <div className="text-[11px] leading-tight text-white/60 mt-1">{i.v}</div>
        </div>
      ))}
    </div>
  );
}
