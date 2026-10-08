/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Canonical host is www. Redirect the bare domain so Google only ever sees one version.
  // (Do NOT also configure Vercel to redirect www -> non-www, or you will create a loop.)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rangrezholidays.com' }],
        destination: 'https://www.rangrezholidays.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
