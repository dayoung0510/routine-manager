module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  compiler: {
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
