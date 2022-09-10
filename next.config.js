const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    relay: {
      src: './',
      artifactDirectory: '__generated__',
      language: 'typescript',
    },
  },
  i18n,
};

module.exports = nextConfig;
