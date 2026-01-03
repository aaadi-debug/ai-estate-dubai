/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.rocket.new',
        pathname: '/generatedImages/**',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
