"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
    if (res?.ok) {
      router.push("/admin");
    } else {
      setErr("Invalid email or password");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-4xl", className)} {...props}>
      <Card className="overflow-hidden p-0 border-white/10 bg-[#0E1220]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={onSubmit} className="p-6 md:p-8 flex flex-col justify-center">
            <FieldGroup>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">Admin Sign In</h1>
                <p className="text-sm text-white/60">
                  Authenticate to access the game management panel.
                </p>
              </div>

              {params.get("callbackUrl") && (
                <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg">
                  Please sign in to continue to the requested page.
                </div>
              )}

              {err && (
                <Alert variant="destructive" className="py-2.5">
                  <AlertDescription>{err}</AlertDescription>
                </Alert>
              )}

              <Field>
                <FieldLabel htmlFor="email" className="text-white/80">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@arg-topup.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.06] border-white/10 text-white"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-white/80">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/[0.06] border-white/10 text-white"
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Field>

              <FieldDescription className="text-center text-xs text-white/40">
                Single administrator environment. Password protected.
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-[#05070C] md:block min-h-[360px]">
            <Image
              src="/images/games/free-fire.jpeg"
              alt="ARG TopUp Gaming"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1220] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs font-bold uppercase tracking-widest text-violet-400">ARG TopUp</div>
              <div className="text-lg font-bold text-white mt-1">Management Portal</div>
              <p className="text-xs text-white/60 mt-0.5">Control pricing, catalog visibility, and order routes.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
