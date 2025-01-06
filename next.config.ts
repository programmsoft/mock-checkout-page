import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  missingSuspenseWithCSRBailout: false,
};

export default nextConfig;
