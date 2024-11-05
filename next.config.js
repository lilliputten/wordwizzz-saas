const { withContentlayer } = require('next-contentlayer2');
/* NOTE 2024.11.04, 19:20: We've got an error for contentlayer:
 * Warning: Contentlayer might not work as expected on Windows
 * NoConfigFoundError {
 */

import('./env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
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
// module.exports = nextConfig;
