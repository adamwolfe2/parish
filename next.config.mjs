/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    return [
      { source: '/our-company', destination: '/about', permanent: true },
      { source: '/parish-company', destination: '/about', permanent: true },
      { source: '/services', destination: '/about', permanent: true },
      { source: '/investment-philosophy', destination: '/philosophy', permanent: true },
      { source: '/selected-media-archive', destination: '/research', permanent: true },
      { source: '/blog', destination: '/research', permanent: true },
      { source: '/blog-2', destination: '/research', permanent: true },
      { source: '/blog-3', destination: '/research', permanent: true },
    ];
  },
};

export default nextConfig;
