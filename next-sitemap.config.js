/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://b13garment.id',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/404', 
    '/500', 
    '/admin',
    '/admin/*',
    '/api/*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority untuk halaman penting
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/produk') || path.startsWith('/portofolio')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/about-us') || path.startsWith('/contact-us')) {
      priority = 0.7;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};