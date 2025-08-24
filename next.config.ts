import type { NextConfig } from "next";

const nextConfig: NextConfig = {
//allow image from any source
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.pexels.com',
    },
  ],
},
// Removed dangerous ignore settings that bypass quality checks
};

export default nextConfig;
