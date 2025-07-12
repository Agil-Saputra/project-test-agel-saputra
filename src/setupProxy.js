const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/storage', // This will proxy any request starting with /storage
    createProxyMiddleware({
      target: 'https://assets.suitdev.com',
      changeOrigin: true, // Crucial for overcoming basic hotlink protection
      onProxyReq: (proxyReq, req, res) => {
        // Set the 'Referer' header to the target's own domain.
        // This makes the request appear as if it originated from their own site.
        proxyReq.setHeader('Referer', 'https://assets.suitdev.com/');

        // You can also mimic a standard browser User-Agent
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
      },
    })
  );
};