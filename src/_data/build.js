// Date de build, utilisée pour <lastmod> dans le sitemap.
module.exports = () => new Date().toISOString().slice(0, 10);
