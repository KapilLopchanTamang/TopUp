'use client';

export default function GamesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4 bg-gradient-to-b from-[#0F131C] via-[#161D2B] to-[#0F131C]">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="font-[var(--font-russo)] text-2xl sm:text-3xl mb-3">
          Failed to load games
        </h2>
        <p className="text-white/60 text-sm mb-6">
          {error.message || 'Unable to retrieve games. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#F43F5E] text-white font-bold hover:scale-105 transition-transform"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
