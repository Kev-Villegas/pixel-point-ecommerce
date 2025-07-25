import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/banner/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/df11ucbfe/image/upload/v*/pixelpoint/*",
      },
    ],
  },
  compiler: {
    emotion: false,
    styledComponents: false,
    reactRemoveProperties: false,
    removeConsole: false,
  },
};

export default bundleAnalyzer(nextConfig);
