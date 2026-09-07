import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { env } from "@/lib/env";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = env.ADMIN_EMAIL;
        const expectedPassword = env.ADMIN_PASSWORD;
        const credEmail = credentials?.email;
        const credPass = credentials?.password;

        if (
          !email ||
          !expectedPassword ||
          typeof credEmail !== "string" ||
          typeof credPass !== "string"
        ) {
          return null;
        }

        if (credEmail.toLowerCase().trim() !== email.toLowerCase().trim()) {
          return null;
        }

        let ok = false;
        if (
          expectedPassword.startsWith("$2a$") ||
          expectedPassword.startsWith("$2b$") ||
          expectedPassword.startsWith("$2y$")
        ) {
          ok = await bcrypt.compare(credPass, expectedPassword);
        } else {
          ok = safeCompare(credPass, expectedPassword);
        }

        if (!ok) return null;

        return { id: "admin", email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET,
  pages: { signIn: "/admin/login" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname === "/admin/login";
      if (isOnAdmin && !isOnLogin) {
        return isLoggedIn;
      }
      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);


