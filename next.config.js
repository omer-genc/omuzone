/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // envs
  env: {
    NEXT_APP_JSONDB: process.env.NEXT_APP_JSONDB,
  }
}

module.exports = nextConfig
