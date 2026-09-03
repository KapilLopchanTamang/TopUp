import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { env } from "@/lib/env";

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
        const hash = env.ADMIN_PASSWORD_HASH;
        const credEmail = credentials?.email;
        const credPass = credentials?.password;

        if (
          !email ||
          !hash ||
          typeof credEmail !== "string" ||
          typeof credPass !== "string"
        ) {
          return null;
        }

        if (credEmail.toLowerCase().trim() !== email.toLowerCase().trim()) {
          return null;
        }

        const ok = await bcrypt.compare(credPass, hash);
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


