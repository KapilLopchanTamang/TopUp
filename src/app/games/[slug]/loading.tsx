export default function GameLoading() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#0F131C] via-[#161D2B] to-[#0F131C]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/5 animate-pulse" />
          <div className="flex-1">
            <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse mb-2" />
            <div className="h-6 w-96 bg-white/5 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#0E1220] border border-white/[0.06] p-6 animate-pulse"
            >
              <div className="h-6 w-32 bg-white/5 rounded mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-12 bg-white/5 rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
