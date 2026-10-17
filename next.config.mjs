/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Blog posts are standalone HTML files in public/blog. Serve them at clean URLs:
  // /blog -> public/blog/index.html, /blog/<slug> -> public/blog/<slug>.html
  // (the slug pattern excludes dots, so /blog/blog.css and /blog/blog.js still load normally)
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/blog', destination: '/blog/index.html' },
        { source: '/blog/:slug([a-z0-9-]+)', destination: '/blog/:slug.html' },
      ],
    };
  },

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
