export default function Loading() {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}
