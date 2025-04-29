/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pf.eungming.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://pf.eungming.com/server-sitemap.xml',
    ],
  },
} 