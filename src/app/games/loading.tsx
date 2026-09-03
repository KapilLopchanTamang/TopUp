export default function GamesLoading() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#0F131C] via-[#161D2B] to-[#0F131C]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <div className="h-12 w-64 mx-auto bg-white/5 rounded-xl animate-pulse" />
          <div className="mt-3 h-6 w-96 mx-auto bg-white/5 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
