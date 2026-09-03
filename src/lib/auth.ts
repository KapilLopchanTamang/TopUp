import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import "@/lib/env"; // Validate environment variables on import

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        const email = process.env.ADMIN_EMAIL;
        const hash = process.env.ADMIN_PASSWORD_HASH;
        if (!email || !hash || !credentials?.email || !credentials?.password) return null;
        if (credentials.email !== email) return null;
        const ok = await bcrypt.compare(credentials.password, hash);
        if (!ok) return null;
        return { id: "admin", email };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/admin/login" },
};
