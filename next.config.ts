import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow local development
      { protocol: "http", hostname: "localhost" },
      // Allow specific domains for game images
      { protocol: "https", hostname: "sf-tb-sg.ibytedtos.com" }, // TikTok CDN
      { protocol: "https", hostname: "cdn.akamai.steamstatic.com" }, // Steam CDN
      { protocol: "https", hostname: "cdn.mobygames.com" }, // MobyGames CDN
      { protocol: "https", hostname: "*.cloudfront.net" }, // CloudFront
      { protocol: "https", hostname: "*.vercel.app" }, // Vercel deployments
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
