import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  // Enable React strict mode untuk development best practices
  reactStrictMode: true,

  // Optimasi produksi
  poweredByHeader: false, // Hapus header X-Powered-By untuk keamanan
  compress: true, // Enable gzip compression
};

export default withPWA(nextConfig);
