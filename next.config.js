/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/get/posts',
        destination: `/api/posts?get_key=${process.env.GET_KEY}`,
      },
    ];
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
