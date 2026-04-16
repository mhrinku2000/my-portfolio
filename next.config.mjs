/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
      { source: '/about', destination: '/about.html' },
      { source: '/graphic-design', destination: '/graphic-design.html' },
      { source: '/ui-design', destination: '/ui-design.html' },
      { source: '/meta-ads', destination: '/meta-ads.html' },
      { source: '/wordpress-dev', destination: '/wordpress-dev.html' },
      { source: '/blog', destination: '/blog.html' },
    ];
  },
};

export default nextConfig;
