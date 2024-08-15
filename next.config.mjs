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
    ],
  },
};

export default nextConfig;
