/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    relay: {
      src: "./",
      artifactDirectory: "__generated__",
      language: "typescript",
    },
  },
};

module.exports = nextConfig;
