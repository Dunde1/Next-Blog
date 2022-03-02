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
};

module.exports = nextConfig;
