/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { 
    unoptimized: true,
    qualities: [60, 75, 85],
  },
};

export default nextConfig;
