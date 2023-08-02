/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: "1192358730",
    NEXT_PUBLIC_ZEGO_SERVER_ID: "7bb83ace08b86323d34f0d4819ac0b71"
  },
  images: {
    domains: ['localhost']
  }
};

module.exports = nextConfig;
