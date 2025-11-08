import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode untuk development best practices
  reactStrictMode: true,

  // Optimasi produksi
  poweredByHeader: false, // Hapus header X-Powered-By untuk keamanan
  compress: true, // Enable gzip compression
};

export default nextConfig;
