import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/employee-management",
  assetPrefix: "/employee-management/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
