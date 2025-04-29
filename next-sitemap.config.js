/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://minhwang.dev',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://minhwang.dev/server-sitemap.xml',
    ],
  },
} 