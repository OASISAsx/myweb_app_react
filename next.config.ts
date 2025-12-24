import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // ⭐ สำคัญ
  },
};

export default nextConfig;
