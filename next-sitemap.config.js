/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mibbles.app",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/api"] },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/features": 0.9,
      "/pricing": 0.9,
      "/blog": 0.9,
      "/about": 0.7,
      "/press": 0.6,
      "/media-kit": 0.6,
    };
    return {
      loc: path,
      changefreq: path.startsWith("/blog/") ? "monthly" : "weekly",
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
