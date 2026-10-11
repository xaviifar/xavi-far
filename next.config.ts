import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/#projects",
        permanent: true,
      },
      {
        source: "/experience",
        destination: "/#experience",
        permanent: true,
      },
      {
        source: "/chat",
        destination: "/#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
