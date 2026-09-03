"use client";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) router.push("/admin");
    else setErr("Invalid email or password");
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-[#0E1220] border border-white/[0.08] p-6">
      <div className="font-black text-lg">Admin Login</div>
      <div className="text-xs text-white/60 mt-1">Single admin account. No signup.</div>
      {params.get("callbackUrl") && <div className="text-xs text-amber-300 mt-2">Please sign in to continue.</div>}
      <input
        className="mt-4 w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm outline-none focus:border-violet-500"
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mt-3 w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm outline-none focus:border-violet-500"
        placeholder="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {err && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-3 text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-xl"
        >
          {err}
        </div>
      )}
      <button disabled={loading} className="mt-4 w-full rounded-full bg-white text-black font-extrabold py-3 text-sm disabled:opacity-60">
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <Suspense fallback={<div className="text-white/60">Loading...</div>}>
        <LoginInner />
      </Suspense>
    </div>
  );
}
