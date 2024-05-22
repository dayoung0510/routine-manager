module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};
