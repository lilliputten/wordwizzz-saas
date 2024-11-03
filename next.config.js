const { withContentlayer } = require('next-contentlayer2');

import('./env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  /* // TODO?
   * sassOptions: {
   *   includePaths: [path.join(__dirname, 'styles')],
   *   prependData: `@import "main.scss";`,
   * },
   */
};

module.exports = withContentlayer(nextConfig);
