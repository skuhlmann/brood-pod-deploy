/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.sequence.info",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "daohaus.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;
