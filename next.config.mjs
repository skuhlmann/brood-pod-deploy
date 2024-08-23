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
};

export default nextConfig;
