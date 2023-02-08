/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
