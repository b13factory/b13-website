/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://b13garment.id', // domain utama kamu
  generateRobotsTxt: true,          // otomatis buat robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/500'],        // halaman yang tidak perlu diindeks
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://b13garment.id/sitemap.xml',
    ],
  },
};
