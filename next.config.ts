import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://randomuser.me/api/portraits/**')],
  },
}
export default nextConfig;
