"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[75vh] grid place-items-center px-4 py-8">
      <Suspense fallback={<div className="text-white/60 text-sm">Loading login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
