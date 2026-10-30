/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pf.eungming.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  // API 경로는 색인 대상 아님
  exclude: ['/api/*'],
};
