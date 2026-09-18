/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: '/our-companies',
        destination: '/what-we-do',
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig