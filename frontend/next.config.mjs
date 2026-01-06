/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.rocket.new',
        pathname: '/generatedImages/**',
      },
      // ADD THIS: Allow Unsplash images
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // Optional: you can restrict to specific paths if you want
        // pathname: '/photo-*', 
      },
      // Optional but recommended: also allow the other Unsplash domains
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
