import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [new URL("https://randomuser.me/api/portraits/**")],
  },
  allowedDevOrigins: ["10.10.10.38", "*.10.10.10.38"],
};
export default nextConfig;
