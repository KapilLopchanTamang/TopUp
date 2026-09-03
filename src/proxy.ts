import { withAuth } from "next-auth/middleware";

// Proxy function using NextAuth's withAuth wrapper
export const proxy = withAuth({
  pages: { signIn: "/admin/login" },
});

export const config = { matcher: ["/admin/:path*"] };
