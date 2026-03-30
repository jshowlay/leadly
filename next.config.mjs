/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
  /**
   * Dev-only: disable webpack filesystem cache so `.next/server` chunk IDs (e.g. favicon route)
   * don’t go stale after edits/HMR and throw `Cannot find module './NNN.js'`.
   * Production builds keep default caching (this runs only when `dev === true`).
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
