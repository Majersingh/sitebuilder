/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ⬅ THIS makes Next.js output static files
  images: {
    unoptimized: true, // required for static export
  },
};

module.exports = nextConfig;
